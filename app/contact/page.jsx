"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        const payload = {
            username: "Contact Form Bot",
            embeds: [
                {
                    title: "📬 New Contact Form Submission",
                    color: 0x5865F2,
                    fields: [
                        { name: "Full Name", value: formData.name || "N/A", inline: true },
                        { name: "Email", value: formData.email || "N/A", inline: true },
                        { name: "Message", value: formData.message || "N/A" }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        try {
            const res = await fetch("https://discord.com/api/webhooks/1385167627487285308/-fSLlNozdRr8qBSzuRw3nenDnr42YoQagsuFxiR7K6AXmfXl5GpIzFwYVRtdaxquQ4wt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSent(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending message.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="py-20">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Contact Me<span className="text-primary">.</span></h1>
                <p className="text-xs">
                    Feel free to contact me if you have any <br /> questions or works
                    <span className="text-primary">.</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-2 px-6">
                <Label className="mt-3" htmlFor="name">Full Name</Label>
                <Input id="name" type="text" value={formData.name} onChange={handleChange} placeholder="sharif khan" required />

                <Label className="mt-3" htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="sharifkhan@gmail.com" required />

                <Label className="mt-3" htmlFor="message">Message</Label>
                <Textarea id="message" className="min-h-[100px]" value={formData.message} onChange={handleChange} placeholder="I wanna ask yo.." required />

                <Button className="mt-4" type="submit" disabled={sending}>
                    {sending ? "Sending..." : "Send"}
                </Button>

                {sent && <p className="text-green-600 text-sm mt-2">✅ Message sent to Discord!</p>}
            </form>
        </div>
    );
}
