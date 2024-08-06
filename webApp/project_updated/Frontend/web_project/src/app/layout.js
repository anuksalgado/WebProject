
import "../../globals.css";
import UserProvider from "@/components/UserProvider";


export const metadata = {
  title: "Web Project",
  description: "Your coolest LMS platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="w-full">
            <div className="contentContainer">
              {children}
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}