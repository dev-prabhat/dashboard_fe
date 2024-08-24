# Sales Dashboard Frontend

This repository contains the frontend code for the Sales Dashboard application, built using React and Tailwind CSS.

## Table of Contents

- [Sales Dashboard Frontend](#sales-dashboard-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)

## Features

- **User Authentication**: Secure login for users and admin.
- **Role-Based Access Control**: Admins have access to all routes, while regular users can only access the home route.
- **Responsive Design**: Fully responsive design using Tailwind CSS.
- **Sales Management**: Manage product categories, products, and sales data.

## Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/) (v1.x or later)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/dev-prabhat/dashboard_fe.git
```

```bash
cd dashboard_fe
npm install 
```

or

```bash
cd dashboard_fe
yarn install
```

Create a .env file in the root of the project and add the following environment variable:

```bash
VITE_API_URL = http://localhost:8000/api
```

```bash
npm start
```

or

```bash
yarn start
```