// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// import authService from "@/services/auth.service";

// export default function ForgotPasswordPage() {

//   const router = useRouter();

//   const [email, setEmail] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const [success, setSuccess] =
//     useState("");

//   async function handleSubmit(
//     event: React.FormEvent<HTMLFormElement>
//   ) {

//     event.preventDefault();

//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {

//       const message =
//         await authService.forgotPassword({
//           email: email.trim(),
//         });

//       setSuccess(
//         message ||
//         "Password reset link has been sent to your email."
//       );

//     } catch (err: unknown) {

//       if (axios.isAxiosError(err)) {

//         setError(
//           err.response?.data?.message ??
//           "Unable to process password reset request."
//         );

//       } else if (err instanceof Error) {

//         setError(
//           err.message
//         );

//       } else {

//         setError(
//           "Unexpected error occurred."
//         );
//       }

//     } finally {

//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

//       <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

//         <h1 className="mb-2 text-center text-3xl font-bold">
//           Forgot Password
//         </h1>

//         <p className="mb-6 text-center text-sm text-gray-500">
//           Enter your registered email address and
//           we will send you a password reset token.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           <div>

//             <label
//               htmlFor="email"
//               className="mb-1 block text-sm font-medium"
//             >
//               Email
//             </label>

//             <input
//               id="email"
//               type="email"
//               autoComplete="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(event) =>
//                 setEmail(
//                   event.target.value
//                 )
//               }
//               required
//               className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
//             />

//           </div>

//           {error && (

//             <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
//               {error}
//             </div>

//           )}

//           {success && (

//             <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
//               {success}
//             </div>

//           )}

//           <button
//             type="submit"
//             disabled={
//               loading ||
//               !email.trim()
//             }
//             className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >

//             {loading
//               ? "Sending..."
//               : "Send Reset Request"}

//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               router.push("/login")
//             }
//             className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 hover:bg-gray-50"
//           >
//             Back to Login
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/api/axios";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "/auth/forgot-password",
        {
          email: email.trim(),
        }
      );

      setMessage(
        response.data?.message ??
          "If the email exists, password reset instructions have been sent."
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            "Unable to process password reset request."
        );
      } else {
        setError(
          "Unexpected error. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your registered email address to reset your password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              required
              disabled={loading}
              className="w-full rounded border border-gray-300 p-3 outline-none focus:border-blue-600"
            />
          </div>

          {message && (
            <div className="rounded bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Reset Instructions"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full rounded border border-gray-300 p-3 text-gray-700 hover:bg-gray-50"
          >
            Back to Login
          </button>

        </form>
      </div>
    </div>
  );
}