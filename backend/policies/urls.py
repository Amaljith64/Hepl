from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InsurancePolicyListView



urlpatterns = [
    path('policies/', InsurancePolicyListView.as_view(), name='policy-list'),
]