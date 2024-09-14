# Poch'Lib

Poch'Lib is a web application developed for "La Plume Enchantée," a local bookstore. The application allows users to search for books using the Google Books API and save them to a personalized list, which they can then use to pick up the books at the bookstore.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Author](#author)

## Prerequisites
Before you begin, ensure you have the following tools installed on your machine:

- **Git**: Used to clone the project repository. [Download Git](https://git-scm.com/downloads) if not already installed.
- **Visual Studio Code (VSCode)**: An Integrated Development Environment (IDE) for editing code. [Download VSCode](https://code.visualstudio.com/) if not installed.
- **Live Server Extension for VSCode**: A Visual Studio Code extension that allows you to open the project in a local server directly from the editor. [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## Installation

To get started with the application, follow these steps:

1. **Clone the Repository**:
   Open your command terminal and navigate to the directory where you want to place the project. Then, run the following command to clone the repository:
   ```bash
   git clone https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git
   ```
   
   This will create a new folder named `Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib` in your current directory, containing all the necessary project files.

2. **Open the Project in Visual Studio Code**:
   Navigate to the newly created project folder and open it in Visual Studio Code:
   ```bash
   cd Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib
   code .
   ```

3. **Install the Live Server Extension**:
   In Visual Studio Code, open the Extensions panel (on the left side) and search for "Live Server." Click "Install" on the extension by **Ritwick Dey**. Alternatively, you can install it from the VSCode Marketplace [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

4. **Launch the Application**:
   In the project folder, right-click on the `index.html` file and choose **"Open with Live Server"**. This will automatically open the application in your default web browser.

## Running the Application

Once the project is launched via Live Server, you can begin interacting with the application through the user interface.

1. **Adding a Book**:
   - Click the "Add Book" button.
   - Enter the title and author of the book you are searching for.
   - Click "Search" to display the results fetched from the Google Books API.
   - You can add any of the search results to your **Poch'List** (a personal book list) by clicking the bookmark icon.

2. **Managing the Poch'List**:
   - Your Poch'List, which appears below the search results, will display the books you've bookmarked.
   - To remove a book from your list, click the trash can icon next to the book in your Poch'List.

## Usage

The application works as a **Single Page Application** (SPA), meaning all interactions take place on a single web page without reloading. The page has two main functionalities:

1. **Search and Add Books**:  
   Users can search for books by title and author using the Google Books API. The results are displayed on the same page, allowing users to select the books they want to keep.

2. **Display and Manage the Book List (Poch'List)**:  
   Users can save books to their Poch'List using the bookmark icon and remove them using the trash can icon. The list is persistent across sessions, as it uses the **Session Storage API**.

## Features

1. **Add and Remove Books**:  
   Users can search for books via the Google Books API and manage their personal list.
   
2. **Responsive Design**:  
   The application is responsive and works on mobile, tablet, and desktop, with designs adapted for each screen size.

3. **Session Storage**:  
   Books added to the Poch'List are stored in the browser’s session, meaning they remain visible as long as the browser tab is open. Closing the tab clears the list.

4. **Mobile-First Approach**:  
   The site is designed with mobile users in mind, ensuring a smooth user experience across devices.

## Technologies Used

- **HTML**: Provided structure and layout.
- **SCSS**: Pre-processed CSS to add styling and responsiveness.
- **JavaScript**: Core functionality of the application, including interaction with the Google Books API and session management.
- **Google Books API**: Used to search for books and retrieve book data.
- **Session Storage API**: Used to persist the user's Poch'List across sessions.
- **Font Awesome**: Used for the bookmark and trash can icons.

## Author

Developed by **Aïcha Imène DAHOUMANE**  
GitHub: [@Aiyeesha](https://github.com/Aiyeesha)
