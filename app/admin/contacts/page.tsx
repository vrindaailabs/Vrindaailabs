"use client";

import { useEffect, useState } from "react";

import ContactTable from "@/components/admin/contacts/ContactTable";
import ContactViewModal from "@/components/admin/contacts/ContactViewModal";
import ContactStatusDialog from "@/components/admin/contacts/ContactStatusDialog";
import DeleteContactDialog from "@/components/admin/contacts/DeleteContactDialog";

import { contactService } from "@/services/contact.service";

import type { ContactResponse } from "@/types/contact";

export default function ContactsPage() {

  const [contacts, setContacts] =
    useState<ContactResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedContact, setSelectedContact] =
    useState<ContactResponse | null>(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [statusOpen, setStatusOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  async function loadContacts() {

    setError("");

    try {

      const response =
        await contactService.getAll();

      setContacts(
        response.data ?? []
      );

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load contact enquiries."
      );

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    let cancelled = false;

    async function fetchContacts() {

      try {

        const response =
          await contactService.getAll();

        if (!cancelled) {

          setContacts(
            response.data ?? []
          );

          setError("");

        }

      } catch (error) {

        console.error(error);

        if (!cancelled) {

          setError(
            "Unable to load contact enquiries."
          );

        }

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }
    }

    fetchContacts();

    return () => {

      cancelled = true;

    };

  }, []);

  function handleView(
    contact: ContactResponse
  ) {

    setSelectedContact(contact);

    setViewOpen(true);

  }

  function handleStatus(
    contact: ContactResponse
  ) {

    setSelectedContact(contact);

    setStatusOpen(true);

  }

  function handleDelete(
    contact: ContactResponse
  ) {

    setSelectedContact(contact);

    setDeleteOpen(true);

  }

  async function confirmDelete() {

    if (!selectedContact) {
      return;
    }

    try {

      await contactService.delete(
        selectedContact.id
      );

      setDeleteOpen(false);

      setSelectedContact(null);

      await loadContacts();

    } catch (error) {

      console.error(error);

      setError(
        "Unable to delete contact enquiry."
      );

    }

  }

  async function refreshContacts() {

    await loadContacts();

  }

  if (loading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <p className="text-gray-500">
          Loading Contact Enquiries...
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Contact Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all contact enquiries submitted from the website.
          </p>

        </div>

        <div className="rounded-lg border bg-white px-5 py-3 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Contacts
          </p>

          <p className="mt-1 text-2xl font-bold text-blue-600">
            {contacts.length}
          </p>

        </div>

      </div>

      {/* Error */}

      {error && (

        <div className="flex items-center justify-between rounded-lg bg-red-100 p-4 text-red-700">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={loadContacts}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Retry
          </button>

        </div>

      )}

      {/* Table */}

      <ContactTable
        contacts={contacts}
        onView={handleView}
        onStatus={handleStatus}
        onDelete={handleDelete}
      />

      {/* View */}

      <ContactViewModal
        open={viewOpen}
        contact={selectedContact}
        onClose={() => {
          setViewOpen(false);
          setSelectedContact(null);
        }}
      />

      {/* Status */}

      <ContactStatusDialog
        key={
          selectedContact
            ? `status-${selectedContact.id}`
            : "status-none"
        }
        open={statusOpen}
        contact={selectedContact}
        onClose={() => {
          setStatusOpen(false);
          setSelectedContact(null);
        }}
        onSuccess={refreshContacts}
      />

      {/* Delete */}

      <DeleteContactDialog
        open={deleteOpen}
        contact={selectedContact}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}