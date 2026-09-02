"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/careers/FormInput";
import FormSelect from "@/components/careers/FormSelect";
import FormTextarea from "@/components/careers/FormTextarea";
import ResumeUpload from "@/components/careers/ResumeUpload";
import SubmitButton from "@/components/careers/SubmitButton";

import {
  jobApplicationSchema,
  JobApplicationFormData,
} from "@/lib/validations/jobApplication";

import api from "@/lib/api/axios";

interface ApplyFormProps {
  jobTitle: string;
}

export default function ApplyForm({
  jobTitle,
}: ApplyFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [resumeFile, setResumeFile] =
    useState<File | undefined>(undefined);

  const [submitError, setSubmitError] =
    useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: "onBlur",
  });

  async function onSubmit(
    data: JobApplicationFormData
  ) {
    /*
     * Resume is required by the backend.
     */
    if (!resumeFile) {
      setSubmitError(
        "Please upload your resume."
      );

      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      /*
       * Frontend → Backend mapping
       *
       * phone       → phoneNumber
       *
       * The backend expects the application
       * as JSON inside the "application" part
       * and the actual resume inside "resume".
       */
      const application = {
        fullName: data.fullName,

        email: data.email,

        phoneNumber: data.phone,

        jobTitle: jobTitle,

        experience: data.experience,

        currentCompany:
          data.currentCompany ?? "",

        currentCTC:
          data.currentCTC,

        expectedCTC:
          data.expectedCTC,

        noticePeriod:
          data.noticePeriod,

        coverLetter:
          data.coverLetter ?? "",
      };

      /*
       * Create multipart request.
       */
      const formData = new FormData();

      /*
       * Spring Boot:
       *
       * @RequestPart("application")
       */
      formData.append(
        "application",
        JSON.stringify(application)
      );

      /*
       * Spring Boot:
       *
       * @RequestPart("resume")
       */
      formData.append(
        "resume",
        resumeFile
      );

      /*
       * POST /api/careers/apply
       */
      await api.post(
        "/careers/apply",
        formData
      );

      /*
       * Application submitted successfully.
       */
      router.push(
        "/careers/apply/success"
      );

    } catch (error: unknown) {

      console.error(
        "Application submission failed:",
        error
      );

      if (axios.isAxiosError(error)) {

        const message =
          error.response?.data?.message;

        if (typeof message === "string") {

          setSubmitError(message);

        } else {

          setSubmitError(
            "Unable to submit application. Please try again."
          );
        }

      } else {

        setSubmitError(
          "Unable to submit application. Please try again."
        );
      }

    } finally {

      setIsSubmitting(false);

    }
  }

  function handleResumeSelect(
    file: File | undefined
  ) {
    setResumeFile(file);

    setValue(
      "resume",
      file as File,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );

    /*
     * Clear previous API error when
     * candidate selects a new resume.
     */
    if (file) {
      setSubmitError("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 space-y-6"
    >

      {/* ================================================== */}
      {/* Applying For */}
      {/* ================================================== */}

      <FormInput
        label="Applying For"
        value={jobTitle}
        readOnly
      />

      {/* ================================================== */}
      {/* Full Name */}
      {/* ================================================== */}

      <FormInput
        label="Full Name"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName}
      />

      {/* ================================================== */}
      {/* Email */}
      {/* ================================================== */}

      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email}
      />

      {/* ================================================== */}
      {/* Phone */}
      {/* ================================================== */}

      <FormInput
        label="Phone Number"
        placeholder="Enter your 10-digit mobile number"
        {...register("phone")}
        error={errors.phone}
      />

      {/* ================================================== */}
      {/* Current Company */}
      {/* ================================================== */}

      <FormInput
        label="Current Company"
        placeholder="Enter your current company"
        {...register("currentCompany")}
        error={errors.currentCompany}
      />

      {/* ================================================== */}
      {/* Experience */}
      {/* ================================================== */}

      <FormInput
        label="Total Experience"
        placeholder="Example: 3 Years"
        {...register("experience")}
        error={errors.experience}
      />

      {/* ================================================== */}
      {/* Current CTC */}
      {/* ================================================== */}

      <FormInput
        label="Current CTC"
        placeholder="Example: 8 LPA"
        {...register("currentCTC")}
        error={errors.currentCTC}
      />

      {/* ================================================== */}
      {/* Expected CTC */}
      {/* ================================================== */}

      <FormInput
        label="Expected CTC"
        placeholder="Example: 10 LPA"
        {...register("expectedCTC")}
        error={errors.expectedCTC}
      />

      {/* ================================================== */}
      {/* Notice Period */}
      {/* ================================================== */}

      <FormSelect
        label="Notice Period"
        {...register("noticePeriod")}
        error={errors.noticePeriod}
        options={[
          {
            label: "Immediate",
            value: "Immediate",
          },
          {
            label: "15 Days",
            value: "15 Days",
          },
          {
            label: "30 Days",
            value: "30 Days",
          },
          {
            label: "60 Days",
            value: "60 Days",
          },
          {
            label: "90 Days",
            value: "90 Days",
          },
        ]}
      />

      {/* ================================================== */}
      {/* Resume */}
      {/* ================================================== */}

      <ResumeUpload
        file={resumeFile}
        onFileSelect={handleResumeSelect}
        error={errors.resume?.message}
      />

      {/* ================================================== */}
      {/* Cover Letter */}
      {/* ================================================== */}

      <FormTextarea
        label="Cover Letter"
        rows={6}
        placeholder="Tell us why you'd like to join Vrinda AI Labs..."
        {...register("coverLetter")}
        error={errors.coverLetter}
      />

      {/* ================================================== */}
      {/* API Error */}
      {/* ================================================== */}

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </div>
      )}

      {/* ================================================== */}
      {/* Submit */}
      {/* ================================================== */}

      <SubmitButton
        isLoading={isSubmitting}
        text="Submit Application"
        loadingText="Submitting Application..."
      />

    </form>
  );
}