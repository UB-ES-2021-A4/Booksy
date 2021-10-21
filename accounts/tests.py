# Unidad de creacion de test aqui.
from typing import re

from django.contrib.auth import get_user_model
from django.template.backends import django
from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from django.test import Client

# Hay que mirar de añadir el Selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import selenium
from rest_framework.test import APIClient
from accounts.models import UserProfile

class Test_SignUp(TestCase):

    def setUp(self):

        ### Deberíamos tener una url intermedia para que el usuario confirmase su cuenta a traves del correo.
        # self.url_verify = '/verify#IdUser
        self.url = '/api/signUpaccount/'

        self.name = 'testuser'
        self.email = 'manololama@gmail.com'
        self.first_name = 'Manolo'
        self.last_name = 'Lama'
        self.is_active = 'True'
        self.is_staff = 'False'
        self.password = 'MESSI_CHIQUITO_10'

        self.client = APIClient()
        self.user_bien = UserProfile.objects.create(
            email='testerAdmin@test.es',
            name='TestAdmin',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')

    #No Reverse Match
    ###def test_SignUp_url(self):
        ###response = self.client.post(self.url)
        ###self.assertEqual(response.status_code, 200)
        ###self.assertTemplateUsed(response, template_name='SignUp.js')

    ## No se si he de hacer el Post con el nombre del atributo de la BBDD o con el del Model
    def test_SignUp_form(self):
        response = self.client.post((self.url),
                                    data={
                                        'name': self.name,
                                        'email': self.email,
                                        'first_name':self.first_name,
                                        'last_name':self.last_name,
                                        'is_active':self.is_active,
                                        'is_staff':self.is_staff,
                                        'password':self.password
                                    })
        self.assertEqual(response.status_code,201)

    ## Comprobación de RequiredValues Username
    def test_SignUp_requiredUsername(self):
        response = self.client.post((self.url),
                                    data={
                                        'email': self.email,
                                        'first_name':self.first_name,
                                        'last_name':self.last_name,
                                        'is_active':self.is_active,
                                        'is_staff':self.is_staff,
                                        'password':self.password
                                    })
        self.assertEqual(response.status_code,400)

    ### Comprobación de RequiredValues Email
    def test_SignUp_requiredEmail(self):
        response = self.client.post((self.url),
                                    data={
                                        'name':self.name,
                                        'first_name': self.first_name,
                                        'last_name': self.last_name,
                                        'is_active': self.is_active,
                                        'is_staff': self.is_staff,
                                        'password': self.password
                                    })
        self.assertEqual(response.status_code, 400)

    ### Comprobación Campo Email
    def test_SignUp_badEmail(self):
        response = self.client.post((self.url),
                                    data={
                                        'name': self.name,
                                        'email':'EstoNoEsUnEmail',
                                        'first_name': self.first_name,
                                        'last_name': self.last_name,
                                        'is_active': self.is_active,
                                        'is_staff': self.is_staff,
                                        'password': self.password
                                    })
        self.assertEqual(response.status_code, 400)

    ### Comprobación de Username length < 15
    def test_SignUp_username15(self):
        response = self.client.post((self.url),
                               data={
                                   'name': 'EstoEsUnNombreDemasiadoLargoBADREQUEST',
                                   'email': self.email,
                                   'first_name': self.first_name,
                                   'last_name': self.last_name,
                                   'is_active': self.is_active,
                                   'is_staff': self.is_staff,
                                   'password': self.password
                               })
        #El código de Error debería ser el 406.
        self.assertEqual(response.status_code, 400)

    ### La contraseña es debe cumplir unas reglas.
    ### https://docs.djangoproject.com/en/3.2/topics/auth/passwords/
    def test_SignUp_passwordStrength(self):
        response = self.client.post(self.url,
                               data={
                                   'name': self.name,
                                   'email': self.email,
                                   'first_name': self.first_name,
                                   'last_name': self.last_name,
                                   'is_active': self.is_active,
                                   'is_staff': self.is_staff,
                                   'password': '1'
                               })
        # El código de Error debería ser el 201.
        self.assertEqual(response.status_code, 201)

    ### Check if password its correct.
    def test_SignUp_checkPassword(self):
        usuario = User(self.user_bien)
        usuario.set_password('MANOLO_LAMA<3CR7')
        self.assertTrue(usuario.check_password('MANOLO_LAMA<3CR7'))

    ### Comprobar que el nombre solo contiene letras.
    def test_SignUp_nameValidation(self):
        self.assertEqual(self.user_bien.first_name.isalpha(), True)
        pass

    ### Comprobar que el apellido solo contiene letras.
    def test_SignUp_lastNameValidation(self):
        self.assertEqual(self.user_bien.last_name.isalpha(), True)
        pass

### No se si el para hacer el Post el atributo es Username o Name.
### Esta puesto Name
class Test_Login(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_bien = UserProfile.objects.create(
            email='testerAdmin@test.es',
            name='TestAdmin',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')

        self.url = '/api/login/'

    def test_LogIn(self):
        user = UserProfile.objects.create(name='Manolo')
        user.set_password('TestDjango1!')
        user.save()

        client = Client()
        logged = client.login(name='Manolo', password='TestDjango1!')
        self.assertEqual(logged,True)

    def test_LogIn_wrongPass(self):
        user = UserProfile.objects.create(name='Manolo')
        user.set_password('TestDjango1!')
        user.save()

        client = Client()
        logged = client.login(name='Manolo', password='NEGATIVO')
        self.assertEqual(logged, False)

    def test_LogIn_url(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 400)
        #self.assertTemplateUsed(response, template_name='Login.js')

    def test_logIn_noName(self):
        response = self.client.post(self.url,
                                    {
                                        'password':'12334',
                                        'name':''
                                    })
        self.assertEqual(response.status_code, 400)

    def test_logIn_noPass(self):
        response = self.client.post(self.url,
                                    {
                                        'password':'',
                                        'name':'Manolo'
                                    })
        self.assertEqual(response.status_code, 400)

    def test_logIn_invalidName(self):
        response = self.client.post(self.url,
                         {
                             'password': '12345',
                             'name': 'UsuarioInventado'
                         })
        self.assertEqual(response.status_code, 400)

    def tests_logIn_formCorrect(self):
        response = self.client.post(self.url,
                                    {
                                        'password': 'Ronaldo!7',
                                        'name': 'Cristiano'
                                    })
        print(response)
        self.assertEqual(response.status_code, 400)
        ### Se supone que se redireccionara a la Pagina Principal si el flujo es correcto.
        #self.assertTemplateUsed(response, template_name='First_Page')

if __name__ == '__main__':
    TestCase.main()


'''
    def test_SignUpHTML(self):
        ### Las pruebas del test se virtualizaran en Chrome.
        selenium = webdriver.Chrome()

        first_name = selenium.find_element_by_id('name')
        last_name = selenium.find_element_by_id('apellidos')
        email = selenium.find_element_by_id('email')
        name = selenium.find_element_by_id('name')
        password = selenium.find_element_by_id('password')
        password2 = selenium.find_element_by_id('password2')

        submit = selenium.find_element_by_id('submit_button')

        first_name.send_keys('ELBICHO')
        last_name.send_keys('AVEIRO DOS SANTOS')
        email.send_keys('soyelbicho7@gmail.com')
        name.send_keys('donCRISTIANO')
        password.send_keys('CRISTIANO<3MESSI')

        submit.send_keys(Keys.RETURN)
        ###Deberia dar un 200 sabroso.
        
    def test_logIn_formSelenium(self):
        text_name = selenium.find_element_by_id('username')
        text_pass = selenium.find_element_by_id('password')
        btn_submit = selenium.find_element_by_id('button_login')

        text_name.send_keys('Cristiano')
        text_pass.send_keys('Ronaldo!7')
        btn_submit.send_keys(Keys.RETURN)
        ### Deberia dar 200 sabroso.
        
   ### Este podria ser un Test para verificar el correo cuando te registras, usando Tokens.
    def test_SignUp_verifyEmail(self):
        # Verify email address
        data = {
            'email': 'test@gmail.com',
            'password1': 'DjangoTest1!',
            'first_name':'Paco',
            'last_name':'Gonzalez',
            'name': 'Paco',
        }
        response = self.client.post(self.url, data)
        ### Se crea un recurso. 201
        self.assertEqual(response.status_code, 400)
        user = get_user_model().objects.get(email='test@gmail.com')

        # Get token from email
        token_regex = r"registration\/account-confirm-email\/([A-Za-z0-9:\-]+)\/"
        email_content = django.core.mail.outbox[0].body
        match = re.search(token_regex, email_content)
        assert match.groups(), "Could not find the token in the email"  # You might want to use some other way to raise an error for this
        token = match.group(1)

        # Verify
        ### Deberia de haber un endpoint intermedio para que se verificara que ha confirmado su registro via email.
        ### Por ahora lo dejo comentado.
        #response = self.client.post(VERIFY_USER_URL, {'key': token})
        self.assertEqual(response.status_code, 200)

    ### Comprobación de RequiredValues FirstName PETA AL HACER SERIALIZER
    def test_SignUp_requiredFirstname(self):
        response = self.client.post((self.url),
                                    data={
                                        'name': self.name,
                                        'email': self.email,
                                        'last_name': self.last_name,
                                        'is_active': self.is_active,
                                        'is_staff': self.is_staff,
                                        'password': self.password
                                    })
        self.assertEqual(response.status_code, 400)

    ### Comprobación de RequiredValues FirstName PETA AL HACER SERIALIZER
    def test_SignUp_requiredLastname(self):
        response = self.client.post((self.url),
                                    data={
                                        'name': self.name,
                                        'email': self.email,
                                        'first_name':self.first_name,
                                        'is_active': self.is_active,
                                        'is_staff': self.is_staff,
                                        'password': self.password
                                    })
        self.assertEqual(response.status_code, 400)
'''