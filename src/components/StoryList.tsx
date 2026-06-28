"use client";

import React from "react";

/* ── Types ─────────────────────────────────── */

import { STORIES, Story } from "@/data/stories";

/* ── Static data (from outerHTML) ───────────── */

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=e1effe&color=0071f9&size=70&name=";

/* ── Sub-components ─────────────────────────── */

function CreateStoryCard() {
  return (
    <a href="/story/tao-story" className="story-card story-create" style={{ textDecoration: "none" }}>
      {/* Background gradient */}
      <div className="story-card-bg story-create-bg" />
      {/* Plus button */}
      <div className="story-create-plus">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>
      <div className="story-card-name story-create-name">Tạo tin</div>
    </a>
  );
}

function StoryCard({ story }: { story: Story }) {
  const avatarSrc = story.avatar || `${DEFAULT_AVATAR}${encodeURIComponent(story.name.split(" ").slice(-1)[0])}`;
  return (
    <a href={story.href} className="story-card" style={{ textDecoration: "none" }}>
      {/* Background image */}
      <img
        src={story.image}
        alt={story.name}
        className="story-card-bg-img"
        loading="lazy"
      />
      {/* Dark gradient overlay */}
      <div className="story-card-overlay" />
      {/* Avatar */}
      <div className="story-avatar-ring">
        <img
          src={avatarSrc}
          alt={`avatar ${story.name}`}
          className="story-avatar-img"
          loading="lazy"
        />
      </div>
      {/* Name */}
      <div className="story-card-name">{story.name}</div>
    </a>
  );
}

function DiscoveryCard() {
  return (
    <a href="/story" className="story-card story-discovery" style={{ textDecoration: "none" }}>
      <div className="story-discovery-bg" />
      <div className="story-discovery-icon">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      </div>
      <div className="story-card-name story-discovery-name">Khám phá thêm</div>
    </a>
  );
}

/* ── Main component ─────────────────────────── */

export default function StoryList() {
  return (
    <section className="story-section">
      <div className="story-scroll-wrapper">
        <div className="story-list">
          <CreateStoryCard />
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
          <DiscoveryCard />
        </div>
      </div>
    </section>
  );
}
