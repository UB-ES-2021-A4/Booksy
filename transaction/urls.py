from django.urls import path, include

from transaction.views import  BuyView

urlpatterns = [
    path('buy/', BuyView.as_view(), name='buy')
]
