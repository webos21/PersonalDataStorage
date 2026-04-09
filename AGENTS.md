# Personal Data Storage App

## 1. Project Goal

The goal of this project is to develop an Android app for managing personal data such as household accounts, memos, schedules, and passwords.

The app includes a foreground Web Service displayed in the notification area, allowing users to perform the same management through a web browser.


## 2. Project Stacks

| Folder          |  Stack                | Build Priority | Description                                      |
|-----------------|-----------------------|----------------|--------------------------------------------------|
| webos21-java    | JDK8 Compatible       | 1              | Base Java Library for encryption, nano web, ...  |
| WebBack         | JDK8 Compatible       | 2              | Web Backend with Nano and H2 DB                  |
| WebFront        | Node 25, React 19, Typescript, Vite, Tailwind CSS | 3 | Web Frontend, serviced by WebNano |
| webos21-android | Android Library       | 4              | Android widgets and utilities                    |
| app             | Android App           | 5              | Android main app                                 |
