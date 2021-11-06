from django.urls import path, include

from rest_framework.routers import DefaultRouter

from accounts import views

router = DefaultRouter()
router.register('account', views.UserProfileViewSet)
#router.register('logout', views.UserApiLogout)
#router.register('user', views.UserApi, basename='user')

# TODO should do refactoring, path should be account/ + include(router.urls), not signup/ + include(router.urls)
urlpatterns = [
    path('signUp', include(router.urls))
]