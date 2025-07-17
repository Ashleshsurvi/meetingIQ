from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import re
import tiktoken
from openai import OpenAI
import os
import json

from dotenv import load_dotenv
load_dotenv()


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
USE_GPT = False






class ExtractActionsView(APIView):
    def post(self, request):
        transcript = request.data.get("transcript")
        if not transcript:
            return Response(
                {"error": "No transcript provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 1. Clean transcript
        cleaned = re.sub(r"\s+", " ", transcript)
        cleaned = re.sub(r"[^A-Za-z0-9.,?!: -]", "", cleaned)
        cleaned = re.sub(r"\s+", " ", cleaned)
        cleaned = cleaned.strip()

        # 2. Truncate for minimal tokens
        max_chars = 2000
        note = None
        if len(cleaned) > max_chars:
            note = (
                "Transcript exceeded limit. "
                "Returning first few sentences."
            )
            kept = cleaned[:max_chars]
            remainder = cleaned[max_chars:]
            last_sentence_match = re.search(r"([^.?!]*[.?!])[^.?!]*$", remainder.strip())
            if last_sentence_match:
                last_sentence = last_sentence_match.group(1).strip()
                cleaned = kept.strip() + " " + last_sentence
            else:
                cleaned = kept.strip()

                # 3. Word and token counts
        
        word_count = len(cleaned.split())
        encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
        token_count = len(encoding.encode(cleaned))

        if USE_GPT:
            print("inside USE_GPT")
            prompt = f"""
                Extract from this transcript:

                - summary: list of important discussion points (short sentences)
                - action_items: list of tasks with description, owner ("Unassigned" if missing), deadline ("Unspecified" if missing)

                Return ONLY this JSON format:
                {{
                "summary": [...],
                "action_items": [...]
                }}

                Transcript:
                \"\"\"
                {cleaned}
                \"\"\"
                """

            try:
                completion = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You extract meeting summaries and action items."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0
                )

                json_output = completion.choices[0].message.content.strip()

                print("==== Raw GPT output start ====")
                print(json_output)
                print("==== Raw GPT output end ====")

                # Clean code fences
                json_output_clean = json_output.replace("```json", "").replace("```", "").strip()

                try:
                    result = json.loads(json_output_clean)
                    summary = result.get("summary", [])
                    actions = result.get("action_items", [])
                except json.JSONDecodeError:
                    summary = []
                    actions = []

            except Exception as e:
                return Response(
                    {"error": f"OpenAI API error: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        else:
            print("inside else dummy data")
            # Dummy data
            summary = [
                "The team discussed the Q3 budget preparation.",
                "Bob will review the draft next week.",
                "A Zoom meeting is scheduled for tomorrow."
            ]
            actions = [
                {
                    "description": "Prepare the Q3 budget",
                    "owner": "Alice",
                    "deadline": "Friday"
                },
                {
                    "description": "Review the draft",
                    "owner": "Bob",
                    "deadline": "next week"
                },
                {
                    "description": "Attend the Zoom meeting",
                    "owner": "Unassigned",
                    "deadline": "tomorrow"
                }
            ]

        return Response(
            {
                "transcript_received": cleaned,
                "note": note,
                "word_count": word_count,
                "token_count": token_count,
                "summary": summary,
                "action_items": actions
            },
            status=status.HTTP_200_OK
        )

