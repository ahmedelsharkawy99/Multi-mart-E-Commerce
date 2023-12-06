# Multi-mart-E-Commerce Website Readme

This readme provides an overview of the e-commerce website built using React.js, Firebase, Remix Icons, React Router, Redux, Bootstrap, Framer Motion, React Toastify, and PayPal for checkout.

Live Demo: https://maltimart-ecommerce-two.vercel.app/

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

The e-commerce website is a fully functional online store developed using React.js. It provides a user-friendly interface for customers to browse and purchase products. The website integrates with Firebase for authentication, storage, and database functionalities. Remix Icons are used to enhance the visual appeal of the user interface. React Router enables smooth navigation between different pages. Redux is used for state management, ensuring a consistent user experience. Bootstrap provides a responsive and stylish design. Framer Motion adds fluid animations to enhance the user interface. React Toastify displays informative notifications. PayPal is integrated to facilitate secure and seamless checkout.

## Features

- User authentication and authorization
- Product browsing and search functionality
- Shopping cart management
- Secure checkout process with PayPal integration
- Product reviews and ratings
- User profile management
- Order history tracking

## Technologies Used

The e-commerce website utilizes the following technologies:

- React.js: A JavaScript library for building user interfaces.
- Firebase: A comprehensive platform for building web and mobile applications, providing authentication, storage, and database services.
- Remix Icons: A collection of open-source icons for web projects.
- React Router: A library for declarative routing in React applications.
- Redux: A predictable state container for JavaScript apps.
- Bootstrap: A popular CSS framework for building responsive and visually appealing websites.
- Framer Motion: A library for creating smooth and interactive animations in React.
- React Toastify: A notification library for React applications.
- PayPal: A secure payment gateway for online transactions.

## Getting Started

To get started with the e-commerce website, follow the instructions below.

### Installation

1. Clone the repository:

```
git clone <repository-url>
```

2. Change to the project directory:

```
cd e-commerce-website
```

3. Install the dependencies:

```
npm install
```

## Configuration

1. Create a Firebase project and enable Firebase Authentication, Firestore database, and Storage services.

2. Obtain the Firebase configuration object.

3. Create a `.env` file in the project root directory.

4. Add the following environment variables to the `.env` file:

   ````plaintext
   REACT_APP_API_KEY=<YOUR_FIREBASE_API_KEY>
   REACT_APP_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
   REACT_APP_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
   REACT_APP_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
   REACT_APP_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>en
   REACT_APP_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
   REACT_APP_APP_ID=<YOUR_FIREBASE_APP_ID>
   ```

   ````

5. Configure the necessary settings in the Firebase project for each service (Firebase Authentication, Firestore, and Storage).

6. Create a Paypal Project and obtain the paypal credentials to the `.env` file

   ````plaintext
   REACT_APP_PAYPAL_CLIENT_ID=<YOUR_PAYPAL_CLIENT_ID>
   ```

   ````

### Usage

1. Start the development server:

```
npm start
```

2. Open the website in a web browser:

```
http://localhost:5173
```

3. Explore the different features of the e-commerce website.
