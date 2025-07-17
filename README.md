# 🧠 MeetingIQ

**MeetingIQ** is an AI-powered productivity tool that extracts meaningful insights from meeting transcripts—like summaries and action items. Designed to streamline post-meeting follow-ups, MeetingIQ helps teams stay aligned, organized, and efficient.

---

## 🚀 Features

- ✍️ Upload raw meeting transcripts
- 🧠 Automatically extract:
  - Concise **summaries**
  - Clear, owner-specific **action items**
- ⚙️ Smart token-limiting logic for large transcripts
- 📦 Easily toggle GPT mode for development vs. production

---

## 💡 Use Cases

- **Product teams** capturing tasks from sprint planning
- **Managers** tracking action items from reviews
- **Students or researchers** summarizing lecture discussions
- **Sales teams** logging client meeting notes
- **HR** summarizing candidate interviews

---

## 🧾 Project Structure

It consists of main folder **meetingIQ** with sub folders **meetingIQ_backend** and **meetingIQ_frontend**.


---

## ⚙️ Setup Instructions

**✅ 1. Clone the Repo**
git clone https://github.com/your-username/meetingIQ.git](https://github.com/Ashleshsurvi/meetingIQ.git
cd meetingIQ

**✅ 2. Backend Setup**
cd meetingIQ_backend

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

.env contents example:
OPENAI_API_KEY=your_openai_api_key_here

NOTE: if you want to use gpt the enable USE_GPT to true (USE_GPT=true) https://github.com/Ashleshsurvi/meetingIQ/blob/4e46139c244f771006e483457976eb00c847e211/meetingIQ_backend/meetingIQ_app/views.py#L15.

To run: python manage.py runserver


**✅ 3. Frontend Setup**
cd meetingIQ_frontend
npm install

create .env file in meetingIQ_frontend

Copy and edit your .env paste VITE_API_BASE_URL=http://127.0.0.1:8000

To run: npm run dev


## 🧪 API Request

POST /api/extract/
{
  "transcript": "Alice will prepare Q3 budget..."
}

## 🧪 API Response

{
  "summary": [
    "Alice will prepare the Q3 budget by Friday.",
    "Bob will review the draft next week."
  ],
  "action_items": [
    {
      "description": "prepare the Q3 budget",
      "owner": "Alice",
      "deadline": "Friday"
    }
  ],
  "note": "Transcript exceeded limit. Showing first 3,000 characters and last sentence."
}

## 🧠 Inspired by
This project is inspired by real-world problems faced during virtual meetings, sprint planning, and research discussions—designed to make team collaboration more actionable.

