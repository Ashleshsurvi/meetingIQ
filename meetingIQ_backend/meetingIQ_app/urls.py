from django.urls import path
from .views import ExtractActionsView

urlpatterns = [
    path('extract/', ExtractActionsView.as_view()),
]
