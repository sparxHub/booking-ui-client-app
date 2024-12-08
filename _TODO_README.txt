src/
  app/
    splash/
      SplashPage.tsx        // Splash screen page
      SplashPage.module.css // Optional CSS module if needed
    home/
      HomePage.tsx          // Home page with services list
      ServiceCard.tsx       // Individual service card component
      HomePage.module.css   // Optional CSS module
    booking/
      BookingPage.tsx       // Main booking page (calendar view)
      BookingAcknowledgment.tsx // Success acknowledgment page
      BookingPage.module.css
    agenda/
      AgendaPage.tsx        // Active bookings page (list view)
      AgendaPage.module.css
    dialogs/
      notifications/
        NotificationsDialog.tsx // List of notifications dialog
      auth/
        LoginDialog.tsx     // Login dialog
        SignupDialog.tsx    // Signup dialog
  components/
    shared/
      Navbar.tsx            // Reusable navigation bar
      Footer.tsx            // Reusable footer
      Button.tsx            // Generic button
      Modal.tsx             // Modal component for dialogs
      Icon.tsx              // Reusable icons
    layout/
      AppLayout.tsx         // Wrapper for pages with navbar/footer
  contexts/
    AuthContext.tsx         // Context for managing authentication
    NotificationContext.tsx // Context for notifications
  hooks/
    useAuth.ts              // Hook for managing auth logic
    useNotifications.ts     // Hook for handling notifications
    useResponsive.ts        // Hook for responsive UI logic
  services/
    booking.service.ts      // Handles booking API logic
    user.service.ts         // Handles user authentication API logic
    notifications.service.ts // Handles notification API logic
  styles/
    globals.css             // Global styles
    tailwind.css            // Tailwind configuration
  utils/
    dateUtils.ts            // Utilities for date formatting
    validationUtils.ts      // Utilities for form validation
  assets/
    images/
      logo.png              // Business logo
      splash-background.png // Splash screen background
