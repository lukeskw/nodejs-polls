# Polls API

_An API for managing polls created with Fastify, Redis, and Postgres, utilizing a pub/sub pattern for WebSocket updates._

## Project Overview

Polls API is a backend project aimed at providing functionalities for creating, managing, and voting on polls. It employs Fastify as the web framework and integrates Redis and Postgres for data storage and retrieval. Additionally, it utilizes a pub/sub pattern for real-time updates via WebSocket connections.

## Technologies Used

![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Features

- Create new polls with multiple options
- Return all existing polls
- Vote on existing polls
- Real-time updates of poll results through WebSocket

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Ensure Docker is installed on your machine.
4. Run the following command to build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

5. Once the containers are up and running, run the following:

   ```bash
   pnpm install
   pnpm run dev
   ```

6. Then, the API endpoints will be available.

## How to Use

1. Use the provided API endpoints to create polls, vote on polls, and retrieve poll results.
2. Connect to the WebSocket endpoint /polls/:pollId/results to receive real-time updates on poll results.

## Authors

<div align="center">
Lucas Porfirio </br></br>
<a href="https://www.linkedin.com/in/lucas-porfirio-dev/" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
</a>
<a href="https://github.com/lukeskw" target="_blank">
<img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
</a>
<a href="https://dev.to/lukeskw" target="_blank">
<img src=https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white alt=devto style="margin-bottom: 5px;" />
</a>
</div>
Feel free to follow my GitHub for more projects and updates. Thank you for checking out Polls API! Happy coding!
