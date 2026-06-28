"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Layout, Drawer, Grid } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { STORIES, Story } from "@/data/stories";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const DEFAULT_AVATAR = (name: string) =>
  `https://ui-avatars.com/api/?background=e1effe&color=0071f9&size=70&name=${encodeURIComponent(
    name.split(" ").slice(-1)[0]
  )}`;


interface StoryListViewProps {
  router: any;
}

function StoryListView({ router }: StoryListViewProps) {
  const [visibleCount, setVisibleCount] = useState(14);
  const hasMore = visibleCount < STORIES.length;

  const handleShowMore = () => {
    setVisibleCount(STORIES.length);
  };

  return (
    <div className="story-list-container">
      {/* Story của tôi */}
      <div className="story-block">
        <div className="title my-story">Story của tôi</div>
        <div className="story-list-grid">
          <div className="story-grid-item create-item">
            <a
              href="/story/tao-story"
              className="story-item-link"
              onClick={(e) => {
                e.preventDefault();
                router.push("/story/tao-story");
              }}
            >
              <div className="story-item create">
                <div className="content" style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    alt="Create story"
                    src="/images/nn24h/story-default.png"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="create-placeholder-img"
                  />
                  {/* Decorative Sparkles/Stars */}
                  <svg className="sparkle sp-1" viewBox="0 0 24 24" width="18" height="18" fill="white" style={{ position: "absolute", top: 12, left: 12, opacity: 0.85 }}>
                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                  </svg>
                  <svg className="sparkle sp-2" viewBox="0 0 24 24" width="14" height="14" fill="white" style={{ position: "absolute", top: 40, right: 15, opacity: 0.75 }}>
                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                  </svg>
                  <svg className="sparkle sp-3" viewBox="0 0 24 24" width="10" height="10" fill="white" style={{ position: "absolute", top: 85, left: 14, opacity: 0.8 }}>
                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
                  </svg>
                </div>
                <div className="add">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </div>
                <div className="text">Tạo tin</div>
                <div className="create-bottom"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Story mới nhất */}
      <div className="story-block newest">
        <div className="title">Story mới nhất</div>
        <div className="story-list-grid">
          {STORIES.slice(0, visibleCount).map((item) => {
            const avatarUrl = item.avatar || DEFAULT_AVATAR(item.name);
            return (
              <div key={item.id} className="story-grid-item">
                <a
                  href={`/story?id=${item.id}`}
                  className="story-item-link"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/story?id=${item.id}`);
                  }}
                >
                  <div className="story-item">
                    <div className="story-item-overlay">
                      <img
                        src={item.image}
                        alt="Story content preview"
                        loading="lazy"
                      />
                    </div>
                    <div className="avatar">
                      <img src={avatarUrl} alt="avatar" />
                    </div>
                    <div className="name">{item.name}</div>
                    <div
                      className="bottom"
                      style={{ height: "100%", zIndex: 2 }}
                    ></div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <button className="story-show-more-btn" onClick={handleShowMore}>
            Xem thêm
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginLeft: 6 }}>
              <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function StoryPageContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const storyId = searchParams.get("id");
  
  // Find current active story
  const activeStory = STORIES.find((s) => s.id === storyId) || STORIES[0];

  // Close drawer on screen resize to desktop
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <Layout className="app-layout">
      {/* Fixed Header */}
      <AppHeader onMenuClick={handleMenuClick} />

      {/* Hover trigger strip — desktop only */}
      {isDesktop && <div className="sider-hover-trigger" />}

      {/* Desktop Sidebar */}
      {isDesktop && (
        <div
          className={`app-sider${sidebarPinned ? " sider-pinned" : ""}`}
          style={{ width: 240 }}
        >
          <AppSidebar />
        </div>
      )}

      {/* Mobile/Tablet Drawer Sidebar */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="default"
        styles={{ body: { padding: 0 } }}
        style={{ top: 64 }}
        title={null}
        closable={false}
      >
        <AppSidebar />
      </Drawer>

      {/* Main Content */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className="content-wrapper">
            <div className="content-panel">
              {storyId ? (
                <div className="story-detail-grid">
                  
                  {/* Left column - Active story */}
                  <div className="story-detail-main">
                    <div className="story-wrapper">
                      <button
                        className="story-back-btn"
                        onClick={() => router.push("/story")}
                      >
                        &lt; Back
                      </button>
                      
                      <div className="story-item active-story-item">
                        <div className="avatar">
                          <img
                            src={activeStory.avatar || DEFAULT_AVATAR(activeStory.name)}
                            alt="avatar"
                            className="story-avatar-img"
                          />
                        </div>
                        <div className="content-overlay"></div>
                        <div className="content">
                          <img
                            src={activeStory.image}
                            alt="Story image content"
                            className="story-main-img"
                          />
                        </div>
                        <div className="name">{activeStory.name}</div>
                        <div className="bottom"></div>
                      </div>
                    </div>
                  </div>

                  {/* Right column - Suggestions */}
                  <div className="story-detail-side">
                    <div className="story-suggest">
                      <div className="title">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0071f9"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: 8 }}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>Bạn có thể quan tâm</span>
                      </div>

                      <div className="story-suggest-list">
                        {STORIES.map((item) => {
                          const isActive = item.id === activeStory.id;
                          const avatarUrl = item.avatar || DEFAULT_AVATAR(item.name);
                          return (
                            <div
                              key={item.id}
                              className={`story-suggest-item-wrapper ${
                                isActive ? "play-story" : ""
                              }`}
                            >
                              {isActive && (
                                <div className="play-story-overlay">Đang phát</div>
                              )}
                              <a
                                href={`/story?id=${item.id}`}
                                className="story-suggest-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  router.push(`/story?id=${item.id}`);
                                }}
                              >
                                <div className="story-item">
                                  <div className="story-item-overlay">
                                    <img
                                      src={item.image}
                                      alt="Story content preview"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="avatar">
                                    <img src={avatarUrl} alt="avatar" />
                                  </div>
                                  <div className="name">{item.name}</div>
                                  <div
                                    className="bottom"
                                    style={{ height: "100%", zIndex: 2 }}
                                  ></div>
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <StoryListView router={router} />
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default function StoryPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}>
      <StoryPageContent />
    </Suspense>
  );
}
