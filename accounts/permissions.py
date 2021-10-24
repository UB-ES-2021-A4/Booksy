from rest_framework import permissions


class UpdateOwnProfile(permissions.BasePermission):

    def has_permission(self, request, view, obj):
        if request.method is permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id
