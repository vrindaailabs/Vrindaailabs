// "use client";

// import { CareerApplication } from "@/types/career-application";
// import HrNotes from "./HrNotes";

// interface CareerViewModalProps {

//   open: boolean;

//   application: CareerApplication | null;

//   onClose: () => void;

// }

// export default function CareerViewModal({

//   open,

//   application,

//   onClose,

// }: CareerViewModalProps) {

//   if (!open || !application) return null;

//   return (

//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

//       <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">

//         <div className="flex items-center justify-between border-b p-6">

//           <h2 className="text-2xl font-bold">

//             Candidate Details

//           </h2>

//           <button

//             onClick={onClose}

//             className="text-2xl"

//           >

//             ×

//           </button>

//         </div>

//         <div className="grid grid-cols-2 gap-6 p-6">

//           <Field
//             label="Full Name"
//             value={application.fullName}
//           />

//           <Field
//             label="Email"
//             value={application.email}
//           />

//           <Field
//             label="Phone"
//             value={application.phoneNumber}
//           />

//           <Field
//             label="Job Title"
//             value={application.jobTitle}
//           />

//           <Field
//             label="Experience"
//             value={application.experience}
//           />

//           <Field
//             label="Status"
//             value={application.candidateStatus}
//           />

//           <Field
//             label="Applied Date"
//             value={new Date(application.appliedAt).toLocaleString()}
//           />

//         </div>
//         <HrNotes
//           applicationId={application.id}
//         />

//         <div className="border-t p-6 text-right">

//           <button

//             onClick={onClose}

//             className="rounded-lg bg-blue-600 px-6 py-2 text-white"

//           >

//             Close

//           </button>

//         </div>

//       </div>

//     </div>

//   );

// }

// interface FieldProps {

//   label: string;

//   value: string;

// }

// function Field({

//   label,

//   value,

// }: FieldProps) {

//   return (

//     <div>

//       <p className="text-sm text-gray-500">

//         {label}

//       </p>

//       <p className="mt-1 font-semibold">

//         {value}

//       </p>

//     </div>

//   );

// }

"use client";

import HrNotes from "./HrNotes";

import type { CareerApplication } from "@/types/career-application";

interface CareerViewModalProps {
  open: boolean;
  application: CareerApplication | null;
  onClose: () => void;
}

export default function CareerViewModal({
  open,
  application,
  onClose,
}: CareerViewModalProps) {
  if (!open || !application) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Candidate Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Candidate Details */}

        <div className="overflow-y-auto">

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

            <Field
              label="Full Name"
              value={application.fullName}
            />

            <Field
              label="Email"
              value={application.email}
            />

            <Field
              label="Phone"
              value={application.phoneNumber}
            />

            <Field
              label="Job Title"
              value={application.jobTitle}
            />

            <Field
              label="Experience"
              value={application.experience}
            />

            <Field
              label="Status"
              value={application.candidateStatus}
            />

            <Field
              label="Current Company"
              value={application.currentCompany}
            />

            <Field
              label="Current CTC"
              value={application.currentCTC}
            />

            <Field
              label="Expected CTC"
              value={application.expectedCTC}
            />

            <Field
              label="Notice Period"
              value={application.noticePeriod}
            />

            <Field
              label="Applied Date"
              value={new Date(
                application.appliedAt
              ).toLocaleString()}
            />

            <Field
              label="Resume"
              value={application.resumeFileName}
            />

          </div>

          {/* Cover Letter */}

          {application.coverLetter && (
            <div className="border-t p-6">

              <p className="text-sm text-gray-500">
                Cover Letter
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                {application.coverLetter}
              </p>

            </div>
          )}

          {/* HR NOTES */}

          <HrNotes
            applicationId={application.id}
          />

        </div>

        {/* Footer */}

        <div className="flex shrink-0 justify-end border-t bg-white p-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
}

function Field({
  label,
  value,
}: FieldProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}