# TinyUrl-Python-and-React
This repository contains the code for the Tiny URL project, a URL shortening and management application. The project is divided into two parts: the server-side (python) and the client-side (React). Below, you will find information about the technologies used on each side.

## Server-Side (Python)

### Technologies Used:

- **Uvicorn:** Uvicorn is an ASGI server used to run the FastAPI application. It allows the server to handle multiple requests concurrently and efficiently.

- **FastAPI:** FastAPI is a modern, fast, web framework for building APIs with Python. It provides powerful features such as automatic validation, serialization, and documentation.

- **Requests:** Requests is a popular Python library for making HTTP requests. It is used to communicate with external services or APIs.

- **Psycopg2:** Psycopg2 is a PostgreSQL adapter for Python. It allows the application to interact with the PostgreSQL database.

- **Docker**: Docker is used to containerize the application and create a PostgreSQL container for the database. This allows for easy setup and management of the database connection.

## Client-Side (React)

### Technologies Used:

- **Axios:** Axios is a popular JavaScript library used for making HTTP requests from the client-side. It allows the frontend to communicate with the backend API and retrieve data.

### Available Options:

1. **Get the short URL by Sending long URL:** You can use the `/tinyUrl/getShortUrl/{longUrl}` endpoint to get the short URL by sending the long URL. The server will check if the long URL already exists in the database and return the corresponding short URL if found. If the long URL does not exist, the server will create a new short URL and return it.

2. **Get long URL by Sending short url:** Similar to the previous option, you can use the same `/tinyUrl/getLongUrl/{shortUrl}` endpoint to get the long URL by sending the short URL. If the short URL not exist the user will get an error.

3. **See All Created URLs:** You can use the `/tinyUrl/` endpoint to see all the created URLs. This will return a list of all the short URLs and their corresponding long URLs stored in the database.

4. **Direct to URL:** you can put the tiny url directly on the browser, and the application will direct you to the relevant page.


## Installation Instructions:
### Server-Side

1. **Prerequisites**: Make sure you have Python installed on your computer. If not, you can download Python from the official website (https://www.python.org/downloads/) and install it.

2. **Clone the Repository**: Open a terminal or command prompt and run the following command to clone the project's server-side code:
   (it's better to open the terminal directly within the IDE)

   ```bash
   git clone https://github.com/Oriya2/TinyUrl-Python-and-React.git
   ```

3. **Change Directory**: Navigate to the server-side directory using:

   ```bash
   cd '.\TinyUrl-Python-and-React\Server side-Python\'
   ```
4. **Create virtual env**: Run the follow commands on the ide terminal:
   
      **windows**:
      ```bash
      pip install virtualenv
      virtualenv venv
      venv\Scripts\activate
      ```

      **macOS/Linux:**
      ```bash
      pip3 install virtualenv
      python3 -m venv venv
      source venv/bin/activate
      ```

5. **Install Dependencies**: Install the required Python packages by running:

   ```bash
   pip install --no-cache-dir -r requirements.txt
   ```

6. **Start PostgreSQL**: The server-side requires a PostgreSQL database. To set it up, make sure you have Docker installed on your computer. If you don't have Docker, you can download it from the official website (https://www.docker.com/products/docker-desktop) and install it.

   After installing Docker, run the following command from the project's home directory to start the PostgreSQL container:

   ```bash
   docker-compose up
   ```

   This will create a PostgreSQL container with the necessary configurations.

7. **Run the FastAPI Server**: To start the FastAPI server, run the following command:

   ```bash
   uvicorn src.__main__:app --host 127.0.0.1 --port 8000
   ```

   The server will run on `http://127.0.0.1:8000/tinyUrl/`. (by defualt you will get all Url's created on the app)


### Client-Side
1. **Prerequisites**: Make sure you have Docker installed on your computer. If not, you can download Docker from the official website (https://www.docker.com/products/docker-desktop) and install it.

2. **Pull and Run the React App with Docker**: Open a terminal or command prompt and run the following command to pull the Docker image of the React app and run it as a container:

    ```bash
    docker pull oriyac/react-project:latest
    docker run -d -p 3000:3000 oriyac/react-project:latest
    ```

    This will pull the latest Docker image for the React app and run it as a container. The app will be accessible at http://localhost:3000/.

If you encounter any issues with the port (e.g., port 3000 is already in use on your machine), you can change the port mapping in the docker run command (e.g., -p 3030:3000 to use port 8080).

Now you have the client-side (React) running as a Docker container. You can access the Tiny URL application at http://localhost:3000/ and start using the provided options to create and manage shortened URLs.

Please note that Docker should be installed and running on your computer to follow these instructions. Docker allows you to run the React app in an isolated environment without the need to set up Node.js and npm on your machine. It simplifies the deployment process and ensures consistent behavior across different environments.

## Good luck and enjoy the app 😊
