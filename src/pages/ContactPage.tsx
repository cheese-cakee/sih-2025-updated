import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import ContactCard from "../components/ContactCard";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const ContactPage: React.FC<Props> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={() => setCurrentPage("home")} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/70 dark:bg-white/5 border rounded-3xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Full Name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                />
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                />
              </div>
              <TextInput
                label="Subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(v) => setFormData({ ...formData, subject: v })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full min-h-[140px] px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white"
                  placeholder="Write your message here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <ContactCard
              icon={<MapPin className="w-5 h-5" />}
              title="Office"
              lines={["BusTrack HQ", "Random Avenue, Random City"]}
            />
            <ContactCard
              icon={<Phone className="w-5 h-5" />}
              title="Phone"
              lines={["+91 6012434933", "+91 7800709201"]}
            />
            <ContactCard
              icon={<Mail className="w-5 h-5" />}
              title="Email"
              lines={["support@bustrack.app", "contact@bustrack.app"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
