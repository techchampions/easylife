"use client";

import FeedsList from "../../components/couples_dashboard/FeedsList";
import Header from "../../components/global/Header";

export default function SocialFeedPage() {
  return (
    <div className="min-h-screen">
      <Header name="Mentorship" />
      <div className="p-3 md:p-0">
        <FeedsList />
      </div>
    </div>
  );
}
