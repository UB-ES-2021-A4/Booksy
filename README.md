<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/UB-ES-2021-A4/Booksy">
    <img src="https://user-images.githubusercontent.com/57969201/138897865-7ef61d66-b78a-468b-8895-8790bc6d29dc.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">BOOKSY</h3>

  <p align="center">
    Booksy is an e-commerce Web App project built with React. In this Web App, you can buy and sell first-hand and second-hand books for a moderate price and all the accessories and merchandising you want. With its beautiful and calm colour choice, as a user, you can give a second life to your old books and let other people experience magical and amazing stories.
    <br />
    <a href="https://github.com/UB-ES-2021-A4/Booksy/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://booksy-es2021.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/UB-ES-2021-A4/Booksy/issues">Report Bug</a>
    ·
    <a href="https://github.com/UB-ES-2021-A4/Booksy/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://user-images.githubusercontent.com/57969201/138903406-bef79f12-fb9a-46bb-87ce-48af8ef7c6a8.png)


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)
* [Material UI](https://mui.com/)
* [Django](https://www.djangoproject.com/)
* [SQLite](https://www.sqlite.org/index.html)
* [PostGreSQL](https://www.postgresql.org/)
* [Heroku](https://www.heroku.com)
* [PythonAnywhere](https://www.pythonanywhere.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


### Installation and initialization

1. Download free version IDE's Webstorm (for [FrontEnd development](https://www.jetbrains.com/webstorm/promo/?source=google&medium=cpc&campaign=9641686281&gclid=Cj0KCQiA5OuNBhCRARIsACgaiqXr0BSmyGqFTP-DPPLxGKPytlIGUslCjV0FwmomHdCbeadpHMX2MW0aAtBgEALw_wcB)) and PyCharm (for [BackEnd development](https://www.jetbrains.com/es-es/pycharm/))
2. Clone the repo
   ```sh
   git clone https://github.com/UB-ES-2021-A4/Booksy.git
   ```
3. Install NPM packages in `frontend`
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Change the URLs in all the FrontEnd file to `debug_url` instead of `deploy_url`
   ```js
   const urls = debug_url;
   ```
6. Run the server on the BackEnd
```sh
python manage.py runserver
```
7. Run the web on the FrontEnd
```sh
npm start
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_For more examples of how the web is used, please refer to the [Documentation]https://github.com/UB-ES-2021-A4/Booksy/wiki)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Contact us [Booksy member](https://github.com/UB-ES-2021-A4/Booksy/graphs/contributors)

Project Link: [Booksy](https://github.com/UB-ES-2021-A4/Booksy)

<p align="right">(<a href="#top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/UB-ES-2021-A4/Booksy.svg?style=for-the-badge
[contributors-url]: https://github.com/UB-ES-2021-A4/Booksy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/UB-ES-2021-A4/Booksy.svg?style=for-the-badge
[forks-url]: https://github.com/UB-ES-2021-A4/Booksy/network/members
[stars-shield]: https://img.shields.io/github/stars/UB-ES-2021-A4/Booksy.svg?style=for-the-badge
[stars-url]: https://github.com/UB-ES-2021-A4/Booksy/stargazers
[issues-shield]: https://img.shields.io/github/issues/UB-ES-2021-A4/Booksy.svg?style=for-the-badge
[issues-url]: https://github.com/UB-ES-2021-A4/Booksy/issues
[license-shield]: https://img.shields.io/github/license/UB-ES-2021-A4/Booksy.svg?style=for-the-badge
[license-url]: https://github.com/UB-ES-2021-A4/Booksy/blob/master/LICENSE.txt
[product-screenshot]: https://user-images.githubusercontent.com/57969201/138903406-bef79f12-fb9a-46bb-87ce-48af8ef7c6a8.png
