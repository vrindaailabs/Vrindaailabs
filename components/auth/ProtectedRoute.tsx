// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { isAuthenticated } from "@/lib/auth";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({
//   children,
// }: ProtectedRouteProps) {
//   const router = useRouter();

//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       router.replace("/login");
//       return;
//     }

//     setAuthorized(true);
//   }, [router]);

//   if (!authorized) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }