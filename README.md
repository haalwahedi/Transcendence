# ft_transcendence



## Summary

Welcome to the Transcendence project, where you'll embark on a journey that will reveal your hidden potential. Say goodbye to C and C++ as you dive into uncharted territory. This project challenges you to recreate the magic of Pong, adding an array of features and functionalities. Look back at your computer science beginnings and marvel at how far you've come. It's your time to shine!

**Version:** 13

## Contents

I. Preamble
II. Mandatory Part
   - II.1 Overview
   - II.2 Security Concerns
   - II.3 User Account
   - II.4 Chat
   - II.5 Game
III. Submission and Peer-Evaluation

---

## Chapter I: Preamble

---

## Chapter II: Mandatory Part

### II.1 Overview

The Transcendence project revolves around creating a website for the epic Pong contest! Here's an overview of what you'll be building:

Thanks to your website, users will play Pong with others. You will provide a nice user interface, a chat, and real-time multiplayer online games!

**Project Rules:**
- Backend: Must be written in NestJS.
- Frontend: Must use a TypeScript framework of your choice.
- Libraries: Free to use, but use the latest stable versions.
- Database: PostgreSQL is the only allowed option.
- Single-Page Application: Back and Forward buttons should work.
- Browser Compatibility: Latest stable Chrome and one additional browser.
- Error Handling: No unhandled errors or warnings.
- Launch: A single call to `docker-compose up --build` should suffice.

**Note:** If your computers run on Linux clusters, use Docker in rootless mode with specific considerations.

### II.2 Security Concerns

To ensure a secure website, you must address several security concerns:

- Passwords: Must be hashed before storage.
- Protection: Guard against SQL injections.
- Validation: Implement server-side validation for forms and user input.
- Credentials: Store sensitive data locally in a `.env` file, not in Git.

### II.3 User Account

Here are the key aspects of user accounts:

- OAuth Login: Users must log in via the 42 intranet OAuth system.
- Unique Name: Users can choose a unique display name.
- Avatar: Users can upload avatars; default provided if not.
- Two-Factor Auth: Enable two-factor authentication.
- Friends: Users can add friends and see their statuses.
- Stats: Display user stats, achievements, and match history.

### II.4 Chat

The chat functionality includes:

- Chat Channels: Users can create public, private, or password-protected channels.
- Direct Messages: Users can send direct messages.
- Blocking: Users can block others.
- Channel Ownership: Channel creators are admins and can set passwords, etc.
- Admins: Admins can manage users in a channel.
- Invitations: Invite users to play Pong via chat.
- Profiles: Access player profiles via chat.

### II.5 Game

The heart of the project is the Pong game:

- Live Pong: Users can play Pong directly on the website.
- Matchmaking: A queue system for automatic matching.
- Customization: Offer power-ups or different maps; default game also available.
- Responsiveness: Ensure a smooth user experience, considering network issues.

---

## Chapter III: Submission and Peer-Evaluation

Submit your assignment in your Git repository. Only work within your repository will be evaluated during the defense. Double-check your file names for accuracy.

---

**Disclaimer:** This README provides an overview of the Transcendence project. Refer to project-specific documentation for detailed instructions and guidelines.
