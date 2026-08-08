"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type ApplyFormProps = {
  jobTitle: string;
};

export default function ApplyForm({
  jobTitle,
}: ApplyFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (
    data: JobApplicationFormData
  ) => {
    try {
      setIsSubmitting(true);

      const payload = {
        ...data,
        jobTitle,
      };

      console.log(payload);

      // Future Spring Boot API
      //
      // await fetch("/api/v1/careers/applications", {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // });

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      router.push("/careers/apply/success");
    } catch (error) {
      console.error("Application failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 space-y-6"
    >
      {/* Applying For */}

      <FormInput
        label="Applying For"
        value={jobTitle}
        readOnly
      />

      {/* Full Name */}

      <FormInput
        label="Full Name"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName}
      />

      {/* Email */}

      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email}
      />

      {/* Phone */}

      <FormInput
        label="Phone"
        placeholder="Enter your mobile number"
        {...register("phone")}
        error={errors.phone}
      />

      {/* Current Company */}

      <FormInput
        label="Current Company"
        placeholder="Current company (optional)"
        {...register("currentCompany")}
        error={errors.currentCompany}
      />

      {/* Experience */}

      <FormInput
        label="Total Experience"
        placeholder="Example: 3 Years"
        {...register("experience")}
        error={errors.experience}
      />

      {/* Expected CTC */}

      <FormInput
        label="Expected CTC"
        placeholder="Example: 10 LPA"
        {...register("expectedCTC")}
        error={errors.expectedCTC}
      />

      {/* Notice Period */}

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

      {/* Resume */}

      <ResumeUpload
        file={resumeFile}
        onFileSelect={(file) => {
          setResumeFile(file);

          if (file) {
            setValue("resume", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else {
            setValue("resume", undefined as never, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }}
        error={errors.resume?.message}
      />

      {/* Cover Letter */}

      <FormTextarea
        label="Cover Letter"
        rows={6}
        placeholder="Tell us why you'd like to join Vrinda AI Labs..."
        {...register("coverLetter")}
        error={errors.coverLetter}
      />

      {/* Submit */}

      <SubmitButton
        isLoading={isSubmitting}
        text="Submit Application"
        loadingText="Submitting Application..."
      />
    </form>
  );
}