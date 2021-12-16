import threading


class CustomLock(object):
    __singleton_lock = threading.Lock()
    __singleton_instance = None

    @classmethod
    def getInstance(cls):
        if not cls.__singleton_instance:
            with cls.__singleton_lock:
                if not cls.__singleton_instance:
                    cls._singleton_instance = cls()
        return cls.__singleton_instance

    def __init__(self):
        """ Virtually private constructor. """
        if CustomLock.__singleton_instance is not None:
            raise Exception("This class is a singleton!")
        else:
            CustomLock.__singleton_instance = self
            self.lock = threading.Lock()


lock = CustomLock.getInstance()
