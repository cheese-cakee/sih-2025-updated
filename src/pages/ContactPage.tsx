import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import BackButton from "../components/BackButton";
import ContactCard from "../components/ContactCard";
import TextInput from "../components/TextInput";
import type { PageType, ContactFormData } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ContactPage: React.FC<Props> = ({ setCurrentPage, addNotification }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("Message sent successfully! We'll get back to you soon.", "success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <BackButton onClick={() => setCurrentPage("home")} />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Contact Us
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              We're here to help with any questions or feedback
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 blur-2xl"></div>
              <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput
                      label="Full Name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(v) => setFormData({ ...formData, name: v })}
                      required
                    />
                    <TextInput
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(v) => setFormData({ ...formData, email: v })}
                      required
                    />
                  </div>

                  <TextInput
                    label="Subject"
                    placeholder="What can we help you with?"
                    value={formData.subject}
                    onChange={(v) => setFormData({ ...formData, subject: v })}
                    required
                  />

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-300">
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-h-[160px] px-6 py-4 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none hover:bg-white/80 dark:hover:bg-white/15 focus:scale-[1.02] hover:shadow-lg"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ContactCard
              icon={<MapPin className="w-6 h-6" />}
              title="Office Location"
              lines={["SmartBus Headquarters", "123 Innovation Drive", "Tech City, TC 12345"]}
              color="from-yellow-400 to-orange-500"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone Support"
              lines={["+91 7003434033", "+91 7890603276", "24/7 Support Available"]}
              color="from-green-400 to-green-600"
            />
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Support"
              lines={["support@smartbus.app", "contact@smartbus.app", "Response within 24 hours"]}
              color="from-blue-400 to-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;