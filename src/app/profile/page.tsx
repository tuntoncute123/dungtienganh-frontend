"use client";

import React, { useState, useEffect } from "react";
import { Layout, Grid, Drawer, Modal, Form, Input, Button, DatePicker, App } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import styles from "@/components/profile/profile.module.css";
import Footer from "@/components/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const { Content } = Layout;
const { useBreakpoint } = Grid;

// Custom Circular Progress SVG Component
interface CircularProgressProps {
  percent: number;
  color: string;
  size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percent, color, size = 42 }) => {
  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="rgba(163, 172, 194, 0.12)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.35s ease" }}
      />
      <text
        x="50%"
        y="50%"
        fill="#1c2a4c"
        fontSize={size * 0.22}
        fontWeight="800"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ transform: `rotate(90deg) translate(0px, 0.5px)`, transformOrigin: "center" }}
      >
        {percent}%
      </text>
    </svg>
  );
};

// SVG Line Charts
const getPathData = (values: number[], xCoords: number[]) => {
  return values
    .map((val, idx) => {
      const x = xCoords[idx] || 70;
      const y = 230 - Math.min(100, Math.max(0, val)) * 2;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
};

interface ChartDataPoint {
  date: string;
  flashcard: number;
  theory: number;
  exercise: number;
  exam: number;
}

interface ChartProps {
  data?: ChartDataPoint[];
}

const WeekChart: React.FC<ChartProps> = ({ data = [] }) => {
  const defaultFlashcard = [40, 35, 55, 70, 80, 90, 95];
  const defaultTheory = [20, 25, 30, 40, 55, 65, 75];
  const defaultExercise = [60, 65, 70, 75, 85, 90, 90];
  const defaultExam = [30, 40, 35, 50, 60, 70, 77];

  const xCoords = [70, 180, 290, 400, 510, 620, 730];

  const getCurve = (type: 'flashcard' | 'theory' | 'exercise' | 'exam', defaultVals: number[]) => {
    if (!data || data.length === 0) {
      return getPathData([0, 0, 0, 0, 0, 0, 0], xCoords);
    }
    const points = data.slice(-7);
    const vals = points.map(p => {
      if (type === 'flashcard') return Math.min(100, p.flashcard);
      if (type === 'theory') return Math.min(100, p.theory * 10);
      if (type === 'exercise') return Math.min(100, p.exercise * 50);
      return Math.min(100, p.exam * 100);
    });
    while (vals.length < 7) {
      vals.unshift(0);
    }
    return getPathData(vals, xCoords);
  };

  const getLastPoint = (type: 'flashcard' | 'theory' | 'exercise' | 'exam', defaultVal: number) => {
    if (!data || data.length === 0) return 230; // 0%
    const last = data[data.length - 1];
    let val = 0;
    if (type === 'flashcard') val = Math.min(100, last.flashcard);
    else if (type === 'theory') val = Math.min(100, last.theory * 10);
    else if (type === 'exercise') val = Math.min(100, last.exercise * 50);
    else val = Math.min(100, last.exam * 100);
    return 230 - val * 2;
  };

  return (
    <svg width="100%" height="240" viewBox="0 0 800 240" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {/* Grid lines */}
      <line x1="50" y1="30" x2="750" y2="30" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="70" x2="750" y2="70" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="150" x2="750" y2="150" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="190" x2="750" y2="190" stroke="#e5e7eb" strokeWidth="1.5" />

      {/* Y Axis labels */}
      <text x="35" y="34" fill="#a3acc2" fontSize="11" textAnchor="end">100%</text>
      <text x="35" y="74" fill="#a3acc2" fontSize="11" textAnchor="end">80%</text>
      <text x="35" y="114" fill="#a3acc2" fontSize="11" textAnchor="end">60%</text>
      <text x="35" y="154" fill="#a3acc2" fontSize="11" textAnchor="end">40%</text>
      <text x="35" y="194" fill="#a3acc2" fontSize="11" textAnchor="end">20%</text>

      {/* X Axis labels */}
      <text x="70" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T2</text>
      <text x="180" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T3</text>
      <text x="290" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T4</text>
      <text x="400" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T5</text>
      <text x="510" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T6</text>
      <text x="620" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">T7</text>
      <text x="730" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">CN</text>

      {/* Curves */}
      <path d={getCurve('flashcard', defaultFlashcard)} fill="none" stroke="rgb(34, 197, 94)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={getCurve('theory', defaultTheory)} fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={getCurve('exercise', defaultExercise)} fill="none" stroke="rgb(59, 130, 246)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={getCurve('exam', defaultExam)} fill="none" stroke="rgb(139, 92, 246)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data point circles for CN */}
      <circle cx="730" cy={getLastPoint('flashcard', 95)} r="5" fill="rgb(34, 197, 94)" stroke="#fff" strokeWidth="2" />
      <circle cx="730" cy={getLastPoint('theory', 75)} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
      <circle cx="730" cy={getLastPoint('exercise', 90)} r="5" fill="rgb(59, 130, 246)" stroke="#fff" strokeWidth="2" />
      <circle cx="730" cy={getLastPoint('exam', 77)} r="5" fill="rgb(139, 92, 246)" stroke="#fff" strokeWidth="2" />
    </svg>
  );
};

const MonthChart: React.FC<ChartProps> = ({ data = [] }) => {
  const defaultFlashcard = [40, 55, 75, 90];
  const defaultTheory = [25, 35, 60, 74];
  const defaultExercise = [55, 65, 80, 92];
  const defaultExam = [35, 45, 70, 80];

  const xCoords = [137.5, 312.5, 487.5, 662.5];

  const getCurve = (type: 'flashcard' | 'theory' | 'exercise' | 'exam', defaultVals: number[]) => {
    if (!data || data.length === 0) {
      return getPathData([0, 0, 0, 0], xCoords);
    }
    const paddedData = [...data];
    while (paddedData.length < 28) {
      paddedData.unshift({ flashcard: 0, theory: 0, exercise: 0, exam: 0 });
    }
    const points = paddedData.slice(-28);

    const weeks = [0, 0, 0, 0];
    const counts = [0, 0, 0, 0];

    points.forEach((p, idx) => {
      let weekIdx = Math.min(3, Math.floor(idx / 7));
      let val = 0;
      if (type === 'flashcard') val = Math.min(100, p.flashcard);
      else if (type === 'theory') val = Math.min(100, p.theory * 10);
      else if (type === 'exercise') val = Math.min(100, p.exercise * 50);
      else val = Math.min(100, p.exam * 100);

      weeks[weekIdx] += val;
      counts[weekIdx]++;
    });

    const vals = weeks.map((sum, idx) => (counts[idx] > 0 ? Math.round(sum / counts[idx]) : 0));
    return getPathData(vals, xCoords);
  };

  const getLastPoint = (type: 'flashcard' | 'theory' | 'exercise' | 'exam', defaultVal: number) => {
    if (!data || data.length === 0) return 230; // 0%
    const paddedData = [...data];
    while (paddedData.length < 28) {
      paddedData.unshift({ flashcard: 0, theory: 0, exercise: 0, exam: 0 });
    }
    const lastWeek = paddedData.slice(-7);
    let sum = 0;
    lastWeek.forEach(p => {
      let val = 0;
      if (type === 'flashcard') val = Math.min(100, p.flashcard);
      else if (type === 'theory') val = Math.min(100, p.theory * 10);
      else if (type === 'exercise') val = Math.min(100, p.exercise * 50);
      else val = Math.min(100, p.exam * 100);
      sum += val;
    });
    return 230 - (sum / lastWeek.length) * 2;
  };

  return (
    <svg width="100%" height="240" viewBox="0 0 800 240" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {/* Grid lines */}
      <line x1="50" y1="30" x2="750" y2="30" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="70" x2="750" y2="70" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="110" x2="750" y2="110" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="150" x2="750" y2="150" stroke="#f3f4f6" strokeWidth="1" />
      <line x1="50" y1="190" x2="750" y2="190" stroke="#e5e7eb" strokeWidth="1.5" />

      {/* Y Axis labels */}
      <text x="35" y="34" fill="#a3acc2" fontSize="11" textAnchor="end">100%</text>
      <text x="35" y="74" fill="#a3acc2" fontSize="11" textAnchor="end">80%</text>
      <text x="35" y="114" fill="#a3acc2" fontSize="11" textAnchor="end">60%</text>
      <text x="35" y="154" fill="#a3acc2" fontSize="11" textAnchor="end">40%</text>
      <text x="35" y="194" fill="#a3acc2" fontSize="11" textAnchor="end">20%</text>

      {/* X Axis labels */}
      <text x="137.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 1</text>
      <text x="312.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 2</text>
      <text x="487.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 3</text>
      <text x="662.5" y="215" fill="#a3acc2" fontSize="11" textAnchor="middle">Tuần 4</text>

      {/* Curves */}
      <path d={getCurve('flashcard', defaultFlashcard)} fill="none" stroke="rgb(34, 197, 94)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={getCurve('theory', defaultTheory)} fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={getCurve('exercise', defaultExercise)} fill="none" stroke="rgb(59, 130, 246)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={getCurve('exam', defaultExam)} fill="none" stroke="rgb(139, 92, 246)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data points for Week 4 */}
      <circle cx="662.5" cy={getLastPoint('flashcard', 90)} r="5" fill="rgb(34, 197, 94)" stroke="#fff" strokeWidth="2" />
      <circle cx="662.5" cy={getLastPoint('theory', 74)} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
      <circle cx="662.5" cy={getLastPoint('exercise', 92)} r="5" fill="rgb(59, 130, 246)" stroke="#fff" strokeWidth="2" />
      <circle cx="662.5" cy={getLastPoint('exam', 80)} r="5" fill="rgb(139, 92, 246)" stroke="#fff" strokeWidth="2" />
    </svg>
  );
};

export default function ProfilePage() {
  const { message } = App.useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const screens = useBreakpoint();
  const isDesktop = !!screens.lg;

  // State selectors
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week");
  const [progressView, setProgressView] = useState<"week" | "month">("week");
  const [historyTab, setHistoryTab] = useState<"quiz" | "flashcard" | "test">("quiz");

  const [userProfile, setUserProfile] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [dbStats, setDbStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [flashcardDecks, setFlashcardDecks] = useState<any[]>([]);
  const [deckProgress, setDeckProgress] = useState<any>({});

  // Profile Edit states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm] = Form.useForm();
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const handleOpenEditModal = () => {
    editForm.setFieldsValue({
      name: userProfile?.name || "",
      examDate: userProfile?.examDate ? dayjs(userProfile.examDate) : null,
      password: "",
      confirmPassword: ""
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (values: any) => {
    setUpdatingProfile(true);
    try {
      const token = localStorage.getItem("teacherdung_token");
      if (!token) return;

      const bodyData: any = {
        name: values.name,
        examDate: values.examDate ? values.examDate.format("YYYY-MM-DD") : null,
      };
      if (values.password && values.password.trim() !== "") {
        bodyData.password = values.password;
      }

      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        message.success("Cập nhật thông tin cá nhân thành công!");
        
        // Sync user profile state
        setUserProfile((prev: any) => prev ? { 
          ...prev, 
          name: updatedUser.name,
          examDate: updatedUser.examDate
        } : null);
        
        // Sync localStorage
        const localUserStr = localStorage.getItem("teacherdung_user");
        if (localUserStr) {
          try {
            const localUser = JSON.parse(localUserStr);
            localUser.name = updatedUser.name;
            localUser.examDate = updatedUser.examDate;
            localStorage.setItem("teacherdung_user", JSON.stringify(localUser));
          } catch (e) {}
        }
        
        setIsEditModalOpen(false);
      } else {
        const err = await res.json();
        message.error(err.message || "Có lỗi xảy ra khi cập nhật.");
      }
    } catch (e) {
      message.error("Không thể kết nối đến máy chủ.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      try {
        const token = localStorage.getItem("teacherdung_token");
        if (!token) return;

        // Fetch profile
        const resProfile = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resProfile.ok) {
          const data = await resProfile.json();
          setUserProfile(data);
        }

        // Fetch all lessons
        const resLessons = await fetch(`${API_BASE_URL}/api/lessons`);
        if (resLessons.ok) {
          const lessonsData = await resLessons.json();
          setLessons(lessonsData);
        }

        // Fetch all exams
        const resExams = await fetch(`${API_BASE_URL}/api/exams`);
        if (resExams.ok) {
          const examsData = await resExams.json();
          setExams(examsData);
        }

        // Fetch QuestDB stats
        const resDbStats = await fetch(`${API_BASE_URL}/api/tracking/stats?timeframe=${progressView}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resDbStats.ok) {
          const statsData = await resDbStats.json();
          setDbStats(statsData);
        }

        // Fetch all flashcards for dynamic stats
        const resFc = await fetch(`${API_BASE_URL}/api/flashcards`);
        if (resFc.ok) {
          const fcData = await resFc.json();
          if (Array.isArray(fcData)) {
            setFlashcardDecks(fcData);
          }
        }

        // Load flashcard progress from localStorage
        const prog = localStorage.getItem("fc_progress");
        if (prog) {
          try {
            setDeckProgress(JSON.parse(prog));
          } catch (e) {}
        }
      } catch (e) {
        console.error("Failed to fetch profile and stats", e);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchProfileAndStats();
  }, [progressView]);

  const getExamDaysLeft = (examDateStr: string | null | undefined) => {
    if (!examDateStr) return "_ ngày";
    const examDate = new Date(examDateStr);
    const today = new Date();
    examDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    if (diffTime < 0) return "Đã thi";
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ngày`;
  };

  const formatExamDate = (examDateStr: string | null | undefined) => {
    if (!examDateStr) return "_ / _ / _";
    const [year, month, day] = examDateStr.split("-");
    if (!year || !month || !day) return examDateStr;
    return `${day} / ${month} / ${year}`;
  };

  const handleMenuClick = () => {
    if (isDesktop) {
      setSidebarPinned((prev) => !prev);
    } else {
      setDrawerOpen(true);
    }
  };

  // Dynamic Vocabulary / Flashcard stats
  const totalVocab = flashcardDecks.reduce((sum, d) => sum + (d.cards?.length || d.cardCount || 0), 0) || 19561;
  const masteredVocab = Object.keys(deckProgress).reduce((sum, deckId) => {
    const cards = deckProgress[deckId];
    return sum + (Array.isArray(cards) ? cards.length : 0);
  }, 0);

  // Calculate started vocab: sum of all cards in decks where user has mastered at least one card
  const startedVocab = Object.keys(deckProgress).reduce((sum, deckId) => {
    const deck = flashcardDecks.find(d => d.id === deckId);
    return sum + (deck?.cards?.length || deck?.cardCount || 0);
  }, 0) || (masteredVocab > 0 ? masteredVocab + 10 : 0);

  const unstudiedVocab = Math.max(0, totalVocab - startedVocab);
  const vocabPercentVal = totalVocab > 0 ? Math.min(100, Math.round((startedVocab / totalVocab) * 100)) : 0;

  // Time formatting helpers
  const formatTimeAgo = (dateStr: Date | string) => {
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 60) {
      return diffMins <= 0 ? "Vừa xong" : `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays === 1) {
      return "Hôm qua";
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const formatDate = (dateStr: Date | string) => {
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Dynamic Quiz History
  const getQuizHistory = () => {
    const history: any[] = [];
    lessons.forEach(l => {
      if (l.exerciseId) {
        const saved = localStorage.getItem(`practice_completed_${l.exerciseId}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            history.push({
              id: l.exerciseId,
              title: `Quiz: ${l.title}`,
              completedAt: parsed.completedAt ? new Date(parsed.completedAt) : new Date(),
              correct: parsed.correct || 0,
              total: parsed.total || 10,
              score: parsed.score || 0
            });
          } catch(e) {}
        }
      }
    });
    return history.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
  };

  // Dynamic Test History
  const getTestHistory = () => {
    const history: any[] = [];
    exams.forEach(e => {
      const saved = localStorage.getItem(`practice_completed_${e.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          history.push({
            id: e.id,
            title: e.title,
            completedAt: parsed.completedAt ? new Date(parsed.completedAt) : new Date(),
            correct: parsed.correct || 0,
            total: parsed.total || 50,
            score: parsed.score || 0
          });
        } catch(err) {}
      }
    });
    return history.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
  };

  // Dynamic Flashcard History
  const getFlashcardHistory = () => {
    const history: any[] = [];
    flashcardDecks.forEach(d => {
      const mastered = deckProgress[d.id] || [];
      if (mastered.length > 0) {
        const total = d.cards?.length || d.cardCount || 10;
        history.push({
          id: d.id,
          title: d.title,
          masteredCount: mastered.length,
          totalCount: total,
          isCompleted: mastered.length >= total
        });
      }
    });
    return history;
  };

  // Stats data mapping based on selected timeframe
  const getDynamicStats = (tf: "week" | "month" | "all") => {
    const allowedCourses = userProfile?.allowedCourses || [];
    const myLessons = lessons.filter(l => l.playlistId && allowedCourses.includes(l.playlistId));
    
    // Time calculation
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const filterByTime = (completedAtStr: string) => {
      if (!completedAtStr) return false;
      const completedDate = new Date(completedAtStr);
      if (tf === "week") return completedDate >= oneWeekAgo;
      if (tf === "month") return completedDate >= oneMonthAgo;
      return true;
    };

    // 1. Lý thuyết (Video)
    const videoLessons = myLessons.filter(l => l.videoUrl);
    const totalVideos = videoLessons.length;
    let completedVideos = 0;
    videoLessons.forEach(l => {
      if (l.exerciseId) {
        const saved = localStorage.getItem(`practice_completed_${l.exerciseId}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (filterByTime(parsed.completedAt)) {
              completedVideos++;
            }
          } catch(e) {}
        }
      }
    });
    const theoryPercent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

    // 2. Bài tập (Homework)
    const homeworkLessons = myLessons.filter(l => l.exerciseId);
    const totalHomework = homeworkLessons.length;
    let completedHomework = 0;
    let homeworkScoresSum = 0;
    homeworkLessons.forEach(l => {
      const saved = localStorage.getItem(`practice_completed_${l.exerciseId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (filterByTime(parsed.completedAt)) {
            completedHomework++;
            homeworkScoresSum += parsed.percent || parsed.score || 0;
          }
        } catch (e) {}
      }
    });
    const hwPercent = totalHomework > 0 ? Math.round((completedHomework / totalHomework) * 100) : 0;
    const hwAvgScore = completedHomework > 0 ? (homeworkScoresSum / completedHomework / 10).toFixed(1) : "0";

    // 3. Kiểm tra (Tests)
    const allowedExams = userProfile?.allowedExams || [];
    const myExams = exams.filter(e => allowedExams.length === 0 || allowedExams.includes(e.id));
    const totalExams = myExams.length;
    let completedExams = 0;
    let examScoresSum = 0;
    let maxExamScore = 0;
    myExams.forEach(e => {
      const saved = localStorage.getItem(`practice_completed_${e.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (filterByTime(parsed.completedAt)) {
            completedExams++;
            const scoreTen = (parsed.percent || parsed.score || 0) / 10;
            examScoresSum += scoreTen;
            if (scoreTen > maxExamScore) maxExamScore = scoreTen;
          }
        } catch (err) {}
      }
    });
    const testPercent = totalExams > 0 ? Math.round((completedExams / totalExams) * 100) : 0;
    const testAvgScore = completedExams > 0 ? (examScoresSum / completedExams).toFixed(1) : "0";
    const testMaxScoreStr = maxExamScore.toFixed(1);
    const testAttemptsStr = `${completedExams} lần thi`;

    // 4. Flashcard
    const flashcardTotal = totalVocab;
    const flashcardPercent = totalVocab > 0 ? Math.min(100, Math.round((masteredVocab / totalVocab) * 100)) : 0;
    const flashcardVal = masteredVocab;
    const flashcardAccuracy = totalHomework > 0 && completedHomework > 0 ? Math.round(homeworkScoresSum / completedHomework) || 85 : 85;

    // 5. Giữ chuỗi (Streak)
    const savedStreak = localStorage.getItem("study_streak");
    const baseStreak = savedStreak ? parseInt(savedStreak) : 22;
    let streakVal = baseStreak;
    let streakMax = baseStreak + 3;
    let streakProgress = "";
    let streakPercent = 80;

    if (tf === "week") {
      streakVal = Math.min(baseStreak, 7);
      streakMax = 7;
      streakProgress = `${streakVal}/7 ngày tuần này`;
      streakPercent = Math.round((streakVal / 7) * 100);
    } else if (tf === "month") {
      streakVal = Math.min(baseStreak, 30);
      streakMax = 30;
      streakProgress = `${streakVal}/30 ngày tháng này`;
      streakPercent = Math.round((streakVal / 30) * 100);
    } else {
      streakVal = baseStreak;
      streakMax = baseStreak + 10;
      streakProgress = `${streakVal}/${streakMax} ngày học`;
      streakPercent = Math.round((streakVal / streakMax) * 100);
    }

    return {
      timeframeLabel: tf === "week" ? "Tuần này" : tf === "month" ? "Tháng này" : "Tổng",
      
      flashcardVal: flashcardVal.toString(),
      flashcardTotal: flashcardTotal.toString(),
      flashcardPercent,
      flashcardAccuracy,
      flashcardNew: tf === "week" ? "+ 0 từ mới" : tf === "month" ? "+ 0 từ mới" : `+ ${flashcardVal} từ thuộc`,

      theoryVal: completedVideos.toString(),
      theoryTotal: totalVideos.toString(),
      theoryPercent,
      theoryAccuracy: totalHomework > 0 && completedHomework > 0 ? Math.round(homeworkScoresSum / completedHomework) || 80 : 80,
      theoryNew: tf === "week" ? `+ ${completedVideos} video mới` : tf === "month" ? `+ ${completedVideos} video mới` : `+ ${completedVideos} video`,

      hwVal: completedHomework.toString(),
      hwTotal: totalHomework.toString(),
      hwPercent,
      hwAccuracy: totalHomework > 0 && completedHomework > 0 ? Math.round(homeworkScoresSum / completedHomework) || 90 : 90,
      hwAvgScore: `${hwAvgScore} điểm TB`,

      testVal: testAvgScore,
      testMax: "10",
      testAttempts: testAttemptsStr,
      testPercent,
      testMaxScore: testMaxScoreStr,

      streakVal: streakVal.toString(),
      streakMax: streakMax.toString(),
      streakProgress,
      streakPercent,
    };
  };

  const localStats = getDynamicStats(timeframe);
  const stats = dbStats && dbStats.summary ? {
    timeframeLabel: timeframe === "week" ? "Tuần này" : timeframe === "month" ? "Tháng này" : "Tổng",
    
    flashcardVal: masteredVocab.toString(),
    flashcardTotal: totalVocab.toString(),
    flashcardPercent: totalVocab > 0 ? Math.min(100, Math.round((masteredVocab / totalVocab) * 100)) : 0,
    flashcardAccuracy: dbStats.summary.avgExerciseScore || localStats.flashcardAccuracy,
    flashcardNew: timeframe === "week" ? `+ ${dbStats.summary.completedExercises * 2} từ mới` : timeframe === "month" ? `+ ${dbStats.summary.completedExercises * 5} từ mới` : `+ ${masteredVocab} từ thuộc`,

    theoryVal: dbStats.summary.completedLessons.toString(),
    theoryTotal: localStats.theoryTotal,
    theoryPercent: Math.min(100, Math.round((dbStats.summary.completedLessons / (parseInt(localStats.theoryTotal) || 1)) * 100)) || localStats.theoryPercent,
    theoryAccuracy: localStats.theoryAccuracy,
    theoryNew: `+ ${dbStats.summary.completedLessons} video`,

    hwVal: dbStats.summary.completedExercises.toString(),
    hwTotal: localStats.hwTotal,
    hwPercent: Math.min(100, Math.round((dbStats.summary.completedExercises / (parseInt(localStats.hwTotal) || 1)) * 100)) || localStats.hwPercent,
    hwAccuracy: dbStats.summary.avgExerciseScore || localStats.hwAccuracy,
    hwAvgScore: `${(dbStats.summary.avgExerciseScore / 10).toFixed(1)} điểm TB`,

    testVal: (dbStats.summary.avgExamScore / 10).toFixed(1),
    testMax: "10",
    testAttempts: `${dbStats.summary.completedExams} lần thi`,
    testPercent: Math.min(100, Math.round((dbStats.summary.completedExams / (exams.length || 1)) * 100)) || localStats.testPercent,
    testMaxScore: (dbStats.summary.maxExamScore / 10).toFixed(1),

    streakVal: localStats.streakVal,
    streakMax: localStats.streakMax,
    streakProgress: localStats.streakProgress,
    streakPercent: localStats.streakPercent,
  } : localStats;

  // Heatmap generation
  const mockHeatmapCells = [
    0, 1, 3, 2, 0, 4, 1, // Tuần 1
    2, 0, 1, 3, 4, 0, 2, // Tuần 2
    0, 2, 4, 1, 3, 0, 1, // Tuần 3
    3, 1, 0, 2, 4, 3, 0, // Tuần 4
    1, 4, 2, 0, 1, 3, 2, // Tuần 5
    0, 2, 3, 4, 1, 0, 3, // Tuần 6
    2, 1, 0, 3, 4, 2, 0, // Tuần 7
    0, 3, 4, 1, 2, 0, 1, // Tuần 8
    2, 0, 1, 3, 4, 2, 0, // Tuần 9
    1, 2, 0, 4, 3, 1, 2, // Tuần 10
    0, 3, 4, 1, 2, 0, 3, // Tuần 11
    1, 2, 0, 3, 4, 1, 2, // Tuần 12
    0, 1, 3, 2, 0, 4, 2, // Tuần 13
    1, 2, 0, 3, 4, 0, 0, // Tuần 14
  ];

    const getWeeklyTotals = () => {
    if (!dbStats || !dbStats.weeklyGrid) {
      return { reading: 0, listening: 0, writing: 0, speaking: 0, studyTime: "0m" };
    }
    let reading = 0, listening = 0, writing = 0, speaking = 0, studyTimeMinutes = 0;
    dbStats.weeklyGrid.forEach((row: any) => {
      reading += typeof row.reading === 'number' ? row.reading : parseInt(row.reading) || 0;
      listening += typeof row.listening === 'number' ? row.listening : parseInt(row.listening) || 0;
      writing += typeof row.writing === 'number' ? row.writing : parseInt(row.writing) || 0;
      speaking += typeof row.speaking === 'number' ? row.speaking : parseInt(row.speaking) || 0;
      
      const timeVal = row.studyTime || "0m";
      const parsedTime = parseInt(timeVal.replace("m", "")) || 0;
      studyTimeMinutes += parsedTime;
    });
    return {
      reading,
      listening,
      writing,
      speaking,
      studyTime: `${studyTimeMinutes}m`
    };
  };

  const weeklyTotals = getWeeklyTotals();

  const renderRecentCalendars = () => {
    const heatmapMap = new Map<string, number>();
    if (dbStats && dbStats.heatmap && dbStats.heatmap.length > 0) {
      dbStats.heatmap.forEach((item: any) => {
        heatmapMap.set(item.date, item.count);
      });
    }


    const today = new Date();
    const months = [];
    for (let i = 0; i < 4; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(d);
    }

    return months.map((monthDate) => {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const monthStr = (month + 1).toString().padStart(2, "0");
      const monthTitle = `Tháng ${monthStr} / ${year}`;
      const monthId = `${year}-${monthStr}`;

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayDate = new Date(year, month, 1);
      let firstDayOfWeek = firstDayDate.getDay();
      if (firstDayOfWeek === 0) firstDayOfWeek = 7;

      const weeks = [];
      let currentDay = 1;
      let weekNum = 1;

      while (currentDay <= daysInMonth) {
        const weekDays = [];
        for (let dow = 1; dow <= 7; dow++) {
          if ((weekNum === 1 && dow < firstDayOfWeek) || currentDay > daysInMonth) {
            weekDays.push({ day: null, dateStr: null });
          } else {
            const dateStr = `${year}-${monthStr}-${currentDay.toString().padStart(2, "0")}`;
            weekDays.push({ day: currentDay, dateStr });
            currentDay++;
          }
        }
        weeks.push({ weekNum, days: weekDays });
        weekNum++;
      }

      return (
        <div key={monthId} id={monthId}>
          <div className={styles.monthCalendar}>
            <div className={styles.calendarTable}>
              <div className={styles.monthTitle}>{monthTitle}</div>
              <div className={styles.weekDayHeader}>
                <div className={styles.defaultBoxWeek}></div>
                <div className={styles.itemWeekDay}>T2</div>
                <div className={styles.itemWeekDay}>T3</div>
                <div className={styles.itemWeekDay}>T4</div>
                <div className={styles.itemWeekDay}>T5</div>
                <div className={styles.itemWeekDay}>T6</div>
                <div className={styles.itemWeekDay}>T7</div>
                <div className={styles.itemWeekDay}>CN</div>
              </div>
              {weeks.map((week, wIdx) => {
                const firstDayObj = week.days.find(d => d.day !== null);
                const firstDayVal = firstDayObj ? firstDayObj.day : 1;
                const weekRowId = `${year}-${monthStr}-${firstDayVal.toString().padStart(2, "0")}`;

                return (
                  <div key={wIdx} className={styles.calendarWeekRow} id={weekRowId}>
                    <div className={styles.weekItem}>
                      <span className={styles.body03Bold}>Tuần ${week.weekNum}</span>
                    </div>
                    {week.days.map((d, dIdx) => {
                      if (!d.day || !d.dateStr) {
                        return (
                          <div key={dIdx} className={styles.dayItem}>
                            <span className={styles.opacity0}></span>
                          </div>
                        );
                      }

                      const count = heatmapMap.get(d.dateStr) || 0;
                      const hasStudied = count > 0;
                      const isCurrent = d.dateStr === today.toISOString().split("T")[0];

                      return (
                        <div
                          key={dIdx}
                          className={`${styles.dayItem} ${hasStudied ? styles.weekItemActive : ""} ${isCurrent ? styles.currentDay : ""}`}
                          style={{ position: "relative" }}
                        >
                          {hasStudied && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              fill="#f59e0b"
                              viewBox="0 0 24 24"
                              style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1,
                              }}
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          )}
                          <span
                            className={styles.opacity1}
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 2,
                              color: hasStudied ? "#1c2a4c" : "inherit",
                              fontWeight: hasStudied ? 700 : "normal",
                              fontSize: "12px",
                            }}
                          >
                            {d.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };

const getHeatmapCells = () => {
    const cells = new Array(98).fill(0);
    if (!dbStats || !dbStats.heatmap || dbStats.heatmap.length === 0) {
      return cells;
    }

    const heatmapMap = new Map<string, number>();
    dbStats.heatmap.forEach((item: any) => {
      heatmapMap.set(item.date, item.count);
    });

    const today = new Date();
    for (let i = 0; i < 98; i++) {
      const diffDays = 97 - i;
      const targetDate = new Date(today.getTime() - diffDays * 24 * 60 * 60 * 1000);
      const dateStr = targetDate.toISOString().split("T")[0];
      const count = heatmapMap.get(dateStr) || 0;
      
      if (count === 0) cells[i] = 0;
      else if (count <= 2) cells[i] = 1;
      else if (count <= 5) cells[i] = 2;
      else if (count <= 10) cells[i] = 3;
      else cells[i] = 4;
    }
    return cells;
  };

  const heatmapCells = getHeatmapCells();
  const totalTrackedDays = 94;
  const activeDaysCount = heatmapCells.filter(level => level > 0).slice(0, totalTrackedDays).length;
  const activePercentage = Math.round((activeDaysCount / totalTrackedDays) * 100);

  return (
    <Layout className="app-layout">
      {/* ── Sticky header ── */}
      <AppHeader onMenuClick={handleMenuClick} />

      {/* Hover trigger strip — desktop only */}
      {isDesktop && <div className="sider-hover-trigger" />}

      {/* Desktop Sidebar */}
      {isDesktop && (
        <div
          className={`app-sider${sidebarPinned ? " sider-pinned" : ""}`}
          style={{ width: 240 }}
        >
          <AppSidebar activeKey="profile" />
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
        <AppSidebar activeKey="profile" />
      </Drawer>

      {/* ── Main Content ── */}
      <Content className="app-content">
        <div className="main-scroll">
          <div className={styles.profileContainer}>

            {/* Header section with title and timeframe toggles */}
            <div className={styles.sectionHeader} style={{ padding: "0 40px" }}>
              <div className={styles.headerTitleWrapper}>
                <h1 className={styles.headerTitle} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span className={styles.headerIcon}>
                    <img
                      src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F824224ad4e901f82afd54697b35bda2f87f77fe5.svg?generation=1782490146257559&alt=media"
                      alt="Portfolio Icon"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </span>
                  Tiến Độ Học Tập
                  <Button
                    type="text"
                    icon={<EditOutlined style={{ color: "#35a873" }} />}
                    onClick={handleOpenEditModal}
                    style={{
                      fontSize: 13,
                      display: "inline-flex",
                      alignItems: "center",
                      color: "#35a873",
                      fontWeight: 600,
                      padding: "4px 10px",
                      background: "rgba(53, 168, 115, 0.05)",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Chỉnh sửa thông tin
                  </Button>
                </h1>
                <p className={styles.headerSubtitle}>{stats.timeframeLabel}</p>
              </div>
              <div className={styles.toggleWrapper}>
                <button
                  onClick={() => setTimeframe("week")}
                  className={`${styles.toggleBtn} ${timeframe === "week" ? styles.toggleBtnActive : ""}`}
                >
                  Tuần này
                </button>
                <button
                  onClick={() => setTimeframe("month")}
                  className={`${styles.toggleBtn} ${timeframe === "month" ? styles.toggleBtnActive : ""}`}
                >
                  Tháng này
                </button>
                <button
                  onClick={() => setTimeframe("all")}
                  className={`${styles.toggleBtn} ${timeframe === "all" ? styles.toggleBtnActive : ""}`}
                >
                  Tổng
                </button>
              </div>
            </div>

            {/* Main dashboard content */}
            <div style={{ padding: "0 40px" }}>



              {/* Stats Cards Grid (5 metrics) */}
              <div className={styles.statsGrid}>

                {/* 1. Flashcard Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(236, 253, 245, 0.5))",
                    borderColor: "rgba(167, 243, 208, 0.6)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", outline: "1px solid rgba(16, 185, 129, 0.2)" }}>
                        <img
                          className={styles.cardIcon}
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa82e906a88512982e235ea24f08d1371e5c66278.svg?generation=1782490146256461&alt=media"
                          alt="Flashcard"
                        />
                      </div>
                      <span className={styles.cardTitle}>Flashcard</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "rgb(16, 185, 129)" }}>
                        {stats.flashcardVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.flashcardTotal}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>từ đã thuộc</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.flashcardPercent} color="rgb(16, 185, 129)" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "rgb(5, 150, 105)" }}>{stats.flashcardAccuracy}%</span> chính xác</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.flashcardNew}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Lý thuyết Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(255, 251, 235, 0.5))",
                    borderColor: "rgba(245, 158, 11, 0.3)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", outline: "1px solid rgba(245, 158, 11, 0.2)", color: "#f59e0b" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "block" }}>
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                        </svg>
                      </div>
                      <span className={styles.cardTitle}>Lý thuyết</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "#f59e0b" }}>
                        {stats.theoryVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.theoryTotal}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>video đã xem</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.theoryPercent} color="#f59e0b" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "#d97706" }}>{stats.theoryAccuracy}%</span> hoàn thành</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.theoryNew}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Bài tập Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(138, 180, 248, 0.1))",
                    borderColor: "rgba(138, 180, 248, 0.4)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(66, 133, 244, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(66, 133, 244, 0.1)", outline: "1px solid rgba(66, 133, 244, 0.2)", color: "rgb(66, 133, 244)" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "block" }}>
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </div>
                      <span className={styles.cardTitle}>Bài tập</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "rgb(66, 133, 244)" }}>
                        {stats.hwVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.hwTotal}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>bài tập đã làm</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.hwPercent} color="rgb(66, 133, 244)" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "rgb(26, 86, 219)" }}>{stats.hwAccuracy}%</span> đúng hạn</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.hwAvgScore}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Kiểm tra Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(245, 243, 255, 0.5))",
                    borderColor: "rgba(221, 214, 254, 0.6)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", outline: "1px solid rgba(139, 92, 246, 0.2)" }}>
                        <img
                          className={styles.cardIcon}
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fee0df2cb7a67b753b9de85b630b3f5ea567a17e5.svg?generation=1782490146283126&alt=media"
                          alt="Test"
                        />
                      </div>
                      <span className={styles.cardTitle}>Kiểm tra</span>
                    </div>
                    <div className={styles.cardValueRow}>
                      <span className={styles.cardValue} style={{ color: "rgb(139, 92, 246)" }}>
                        {stats.testVal}
                        <span style={{ fontSize: 16, fontWeight: "normal", color: "#a3acc2", marginLeft: 4 }}>/{stats.testMax}</span>
                      </span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>điểm trung bình</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.testPercent} color="rgb(139, 92, 246)" />
                      <div className={styles.miniChartText}>
                        <p><span style={{ fontWeight: "bold", color: "rgb(109, 40, 217)" }}>{stats.testAttempts}</span></p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>Cao nhất: <span style={{ fontWeight: "bold", color: "rgb(139, 92, 246)" }}>{stats.testMaxScore}</span>/10</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Giữ chuỗi Card */}
                <div
                  className={styles.statCard}
                  style={{
                    backgroundImage: "linear-gradient(to right bottom, rgb(255, 255, 255), rgba(255, 247, 237, 0.6))",
                    borderColor: "rgba(242, 133, 0, 0.3)"
                  }}
                >
                  <div className={styles.cardBgCircle} style={{ backgroundColor: "rgba(242, 133, 0, 0.05)" }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrap} style={{ backgroundColor: "rgba(242, 133, 0, 0.1)", outline: "1px solid rgba(242, 133, 0, 0.2)" }}>
                        <img
                          className={styles.cardIcon}
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcbf19fd8a42b770b4815394d8533242753856c7b.svg?generation=1782490146287234&alt=media"
                          alt="Streak"
                        />
                      </div>
                      <span className={styles.cardTitle}>Giữ chuỗi</span>
                    </div>
                    <div className={styles.cardValueRow} style={{ alignItems: "center", gap: 6 }}>
                      <div style={{ width: 28, height: 28 }}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc50fd3641da93f6252e941b5221653334b77025e.svg?generation=1782490146314135&alt=media"
                          alt="Streak Flame"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <span className={styles.cardValue} style={{ color: "rgb(242, 133, 0)" }}>{stats.streakVal}</span>
                    </div>
                    <p className={styles.cardLabel} style={{ marginTop: 4, minHeight: 20 }}>chuỗi ngày học</p>
                    <div className={styles.cardSubBlock} style={{ marginTop: 12 }}>
                      <CircularProgress percent={stats.streakPercent} color="rgb(242, 133, 0)" />
                      <div className={styles.miniChartText}>
                        <p>Dài nhất: <span style={{ fontWeight: "bold", color: "rgb(28, 42, 76)" }}>{stats.streakMax}</span> ngày</p>
                        <p style={{ marginTop: 2, fontSize: 11 }}>{stats.streakProgress}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Custom Dashboard - Target & Exam Schedule */}
              <div id="dashboard" className={styles.dashboardWrapper}><div className={styles.dashboardHeader}>
                <p className={styles.dashboardHeaderTitle}>Cô Dung đồng hành cùng bạn</p></div>
<div className={styles.mobileLayoutWrapper}><div className={styles.targetScoreSection}><div className={styles.targetScoreFlex}><div className={`${styles.boxShadowTable} ${styles.customTargetCard}`}><div className={styles.customCardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3346 8C11.3346 9.84095 9.84225 11.3333 8.0013 11.3333C6.16035 11.3333 4.66797 9.84095 4.66797 8C4.66797 6.15906 6.16035 4.66667 8.0013 4.66667" stroke="black" strokeLinecap="round"></path><path d="M9.33398 1.46669C8.90317 1.37924 8.45727 1.33334 8.00065 1.33334C4.31875 1.33334 1.33398 4.3181 1.33398 8C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8C14.6673 7.54338 14.6214 7.09748 14.534 6.66667" stroke="black" strokeLinecap="round"></path><path d="M11.0688 4.93125L8 8M11.0688 4.93125L10.8521 4.10086C10.688 3.47181 10.9126 2.7461 11.4324 2.2263L12.1987 1.46004C12.4027 1.25601 12.7186 1.30646 12.783 1.55338L13.1273 2.87275L14.4466 3.21699C14.6935 3.28141 14.744 3.59728 14.54 3.80131L13.7737 4.56757C13.2539 5.08737 12.5282 5.31204 11.8991 5.14791L11.0688 4.93125Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p className={styles.cardHeaderTitle}>Mục tiêu của bạn</p></div><div className={styles.customCardBody}><div className={styles.scoreHighlightBlock}><p className={styles.scoreLabel}>Overall score</p><div className={styles.scoreValueWrapper}><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.scoreValueText}>{userProfile?.targetOverall || "_"}</p></div></div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff6d3a" className="mb-[10px] w-[23px]"><path d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z" fill="#ff6d3a" fillOpacity="1"></path></svg></div></div><div className={styles.skillsGrid}><div className={styles.skillBlock}><p className={styles.scoreLabel}>Reading</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>{userProfile?.targetReading || "_"}</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Listening</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>{userProfile?.targetListening || "_"}</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Writing</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>{userProfile?.targetWriting || "_"}</p></div></div></div><div className={styles.skillBlock}><p className={styles.scoreLabel}>Speaking</p><div className="overflow-hidden"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.examValueText}>{userProfile?.targetSpeaking || "_"}</p></div></div></div></div></div></div><div className={`${styles.boxShadowTable} ${styles.customExamCard}`}><div className={styles.customCardHeader}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M6.33203 8.66667H9.66536M4.33203 8.66667H4.33802M7.66536 11.3333H4.33203M9.66536 11.3333H9.65938" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 1.33334V2.66667M3 1.33334V2.66667" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M0.666016 8.16216C0.666016 5.25729 0.666016 3.80486 1.50076 2.90243C2.33551 2 3.67901 2 6.36602 2H7.63268C10.3197 2 11.6632 2 12.4979 2.90243C13.3327 3.80486 13.3327 5.25729 13.3327 8.16216V8.5045C13.3327 11.4094 13.3327 12.8618 12.4979 13.7642C11.6632 14.6667 10.3197 14.6667 7.63268 14.6667H6.36602C3.67901 14.6667 2.33551 14.6667 1.50076 13.7642C0.666016 12.8618 0.666016 11.4094 0.666016 8.5045V8.16216Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 5.33334H13" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg> <p className={styles.cardHeaderTitle}>Lịch thi</p></div><div className={styles.examCardBody}><div className={styles.examDateBlock}><div className="h-full"><p className={styles.examSublabel}>Ngày dự thi</p><div className={styles.examValueWrapper} onClick={handleOpenEditModal} style={{ cursor: "pointer" }} title="Nhấn để cập nhật ngày dự thi"><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={styles.cardHeaderTitle}>{formatExamDate(userProfile?.examDate)}</p></div><EditOutlined style={{ color: "#35a873", fontSize: 16 }} /></div></div></div><div className={styles.daysLeftBlock}><div className="h-full"><p className={styles.examSublabel}>Số ngày còn lại</p><div className={styles.examValueWrapper}><div style={{position: "relative", opacity: 1, transform: "none"}}><p className={`${styles.examValueText} ${styles.flexCenter}`}>{getExamDaysLeft(userProfile?.examDate)}</p></div></div></div></div></div></div></div></div></div>

                            <div className={styles.diligenceStatsRow}>
                <div className={styles.diligenceHalf}>
                  <div className={styles.hFull}>
                    <div className={styles.calendarCard}>
                      <div className={styles.calendarCardHeader}>
                        <div className={styles.calendarHeaderLeft}>
                          <div className={styles.calendarHeaderFlex}>
                            <p className={styles.calendarTitle}>Biểu đồ “chăm chỉ” của bạn</p>
                            <div className={styles.calendarIndicatorWrapper}>
                              <div className={styles.calendarIndicator}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#f59e0b"
                                  viewBox="0 0 24 24"
                                  style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }}
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                <p className={styles.caption2} style={{ display: "inline-block", verticalAlign: "middle", margin: 0 }}>Ngày học</p>
                              </div>
                            </div>
                          </div>
                          <p className={styles.caption2Light}>Bấm vào ngày/tuần để xem thống kê chi tiết số bài đã làm</p>
                        </div>
                      </div>
                      <div className={styles.flexItemsStart}>
                        <div className={styles.wFull}>
                          <div className={styles.flexJustifyBetweenStart}>
                            <div className={styles.flexJustifyEndGap5}>
                              <div className={styles.calendarWrap}>
                                <div
                                  className={styles.calendarBody}
                                  id="scrollableDiv"
                                  style={{
                                    overflow: "auto",
                                    display: "flex",
                                    flexDirection: "column-reverse",
                                    maxHeight: "350px",
                                  }}
                                >
                                  <div className={styles.infiniteScrollOuter}>
                                    <div className={styles.infiniteScrollInner} style={{ height: "auto", overflow: "auto" }}>
                                      {renderRecentCalendars()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.statsHalf}>
                  <div className={styles.flexGap16}>
                    <div className={styles.statsCard}>
                      <div className={styles.statsCardHeader}>
                        <p className={styles.calendarTitle}>Thống kê số bài đã làm trong tuần</p>
                      </div>
                      <div>
                        <div className={`${styles.gridTable} ${styles.bgHeader}`}>
                          <p className={styles.statsCellHeader}>Ngày</p>
                          <p className={styles.statsCellHeader}>Reading</p>
                          <p className={styles.statsCellHeader}>Listening</p>
                          <p className={styles.statsCellHeader}>Writing</p>
                          <p className={styles.statsCellHeader}>Speaking</p>
                          <p className={styles.statsCellHeader}>Thời gian học</p>
                        </div>
                        {dbStats?.weeklyGrid && dbStats.weeklyGrid.map((row: any, idx: number) => (
                          <div key={idx} className={styles.gridTable}>
                            <div className={styles.statsCellData}>{row.date}</div>
                            <div className={styles.statsCellData}>{row.reading}</div>
                            <div className={styles.statsCellData}>{row.listening}</div>
                            <div className={styles.statsCellData}>{row.writing}</div>
                            <div className={styles.statsCellData}>{row.speaking}</div>
                            <div className={styles.statsCellData}>{row.studyTime}</div>
                          </div>
                        ))}
                        <div className={`${styles.gridTable} ${styles.borderFooter}`}>
                          <p className={styles.statsCellFooter}>Tổng cộng</p>
                          <p className={styles.statsCellFooter} id="reading-all">{weeklyTotals.reading}</p>
                          <p className={styles.statsCellFooter} id="listening-all">{weeklyTotals.listening}</p>
                          <p className={styles.statsCellFooter} id="writing-all">{weeklyTotals.writing}</p>
                          <p className={styles.statsCellFooter} id="speaking-all">{weeklyTotals.speaking}</p>
                          <p className={`${styles.statsCellFooter} ${styles.borderNone}`} id="leaned-all">{weeklyTotals.studyTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


              {/* Progress Trends Panel (Biểu đồ tiến bộ) */}
              <div className={styles.panelContainer}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffdef2a8c87b16406d124ddcd401ebfe908f9bf82.svg?generation=1782490146338983&alt=media"
                        alt="Progress trends"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </span>
                    Xu hướng tiến bộ (Biểu đồ tiến bộ)
                  </h3>
                  <div className={styles.panelToggle}>
                    <button
                      onClick={() => setProgressView("week")}
                      className={`${styles.panelToggleBtn} ${progressView === "week" ? styles.panelToggleBtnActive : ""}`}
                    >
                      Theo tuần
                    </button>
                    <button
                      onClick={() => setProgressView("month")}
                      className={`${styles.panelToggleBtn} ${progressView === "month" ? styles.panelToggleBtnActive : ""}`}
                    >
                      Theo tháng
                    </button>
                  </div>
                </div>
                <div className={styles.chartBody} style={{ padding: "30px 40px 10px 40px", height: "auto" }}>
                  <div style={{ width: "100%" }}>

                    {/* Render live SVG line chart */}
                    {progressView === "week" ? <WeekChart data={dbStats?.chart} /> : <MonthChart data={dbStats?.chart} />}

                    {/* Legend block below the chart */}
                    <div style={{ marginTop: 16, fontSize: 12, padding: "8px 0" }}>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "rgb(34, 197, 94)", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Flashcard</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "#f59e0b", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Lý thuyết</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "rgb(59, 130, 246)", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Bài tập</span>
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ display: "inline-block", width: 12, height: 4, backgroundColor: "rgb(139, 92, 246)", borderRadius: 2 }} />
                          <span style={{ color: "#3d4863", fontWeight: 500 }}>Kiểm tra</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              {/* Activity Heat Map Section (Bạn đã chăm chỉ ra sao) */}
              <div className={styles.panelContainer} style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F795e06cdf98395cdc7b1cb67370a5ae9f27bad08.svg?generation=1782490146449102&alt=media"
                        alt="Hoạt động học tập"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </span>
                    Bạn đã chăm chỉ ra sao? (Hoạt động học tập)
                    <span className={styles.panelTitleSpan}>— Năm 2026</span>
                  </h3>
                  <div className={styles.activityHeaderStats}>
                    <span>Hoạt động <strong>{activeDaysCount}</strong>/ {totalTrackedDays} ngày</span>
                    <span className={styles.activityBadge}>{activePercentage} %</span>
                  </div>
                </div>

                <div className={styles.heatMapScroll}>
                  <div className={styles.heatMapContainer}>
                    {/* Months header label row */}
                    <div className={styles.monthsLabelRow}>
                      <span className={styles.monthLabel} style={{ left: 44 }}>Thg 4</span>
                      <span className={styles.monthLabel} style={{ left: 108 }}>Thg 5</span>
                      <span className={styles.monthLabel} style={{ left: 172 }}>Thg 6</span>
                    </div>

                    {/* Heatmap structure with filled activity data */}
                    <div className={styles.heatMapGridRow}>
                      <div className={styles.daysColumn}>
                        <div className={styles.dayLabel}>T2</div>
                        <div className={styles.dayLabel}>T4</div>
                        <div className={styles.dayLabel}>T6</div>
                        <div className={styles.dayLabel}>CN</div>
                      </div>

                      <div className={styles.weeksContainer}>
                        {Array.from({ length: 14 }).map((_, wIndex) => (
                          <div key={wIndex} className={styles.weekColumn}>
                            {Array.from({ length: 7 }).map((_, dIndex) => {
                              const cellIndex = wIndex * 7 + dIndex;
                              const activityLevel = heatmapCells[cellIndex] || 0;
                              let cellClass = styles.cellL0;

                              if (activityLevel === 1) cellClass = styles.cellL1;
                              else if (activityLevel === 2) cellClass = styles.cellL2;
                              else if (activityLevel === 3) cellClass = styles.cellL3;
                              else if (activityLevel === 4) cellClass = styles.cellL4;

                              // If it's the last column, only render 5 cells to match App.tsx design constraints
                              if (wIndex === 13 && (dIndex === 0 || dIndex === 5 || dIndex === 6)) {
                                return <div key={dIndex} className={styles.cell} style={{ backgroundColor: "transparent" }} />;
                              }
                              return <div key={dIndex} className={`${styles.cell} ${cellClass}`} />;
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.heatMapLegend}>
                  <span>Ít</span>
                  <div className={`${styles.legendBox} ${styles.cellL0}`} />
                  <div className={`${styles.legendBox} ${styles.cellL1}`} />
                  <div className={`${styles.legendBox} ${styles.cellL2}`} />
                  <div className={`${styles.legendBox} ${styles.cellL3}`} />
                  <div className={`${styles.legendBox} ${styles.cellL4}`} />
                  <span>Nhiều</span>
                </div>
              </div>

              {/* Two Column Details Grid: Cần luyện tập thêm & Từ vựng */}
              <div className={styles.detailsGrid}>



                {/* Từ vựng */}
                <div className={styles.detailsCard}>
                  <div className={styles.detailsTitleRow}>
                    <div className={styles.detailsIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffd81ae03ab31a36a96a82a31799e540361508849.svg?generation=1782490146472628&alt=media"
                        alt="Từ vựng"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <span>Từ vựng</span>
                    <span className={styles.detailsTitleSpan}>Tổng hệ thống: {totalVocab} từ</span>
                  </div>

                  <div>
                    <div className={styles.vocabStatRow}>
                      <span className={styles.vocabBigNumber}>{startedVocab}</span>
                      <span className={styles.vocabLabelText}>
                        <strong>/ {totalVocab}</strong> từ đã bắt đầu học
                      </span>
                      <span className={styles.vocabPercentage}>{vocabPercentVal} %</span>
                    </div>

                    <div className={styles.cardProgressTrack}>
                      <div
                        className={styles.cardProgressBar}
                        style={{
                          width: `${vocabPercentVal}%`,
                          backgroundImage: "linear-gradient(to right, rgb(52, 211, 153), rgb(16, 185, 129))"
                        }}
                      />
                    </div>

                    <div className={styles.vocabGreenPanel}>
                      <div className={styles.vocabGreenIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0aa6414df27126c4f446e86e9c2fce9f80285e52.svg?generation=1782490146482383&alt=media"
                          alt="Green Check"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <span className={styles.vocabGreenText}>
                        Trong đó <strong>{masteredVocab}</strong> từ đã thuộc
                      </span>
                    </div>
                  </div>

                  <div className={styles.vocabGridList}>
                    <div className={styles.vocabGridItem}>
                      <div className={styles.vocabGridIconWrap}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fedd36aac750d4c2b10a666c0fadc7309f90b56fa.svg?generation=1782490146473279&alt=media"
                          alt="Gray Book"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <div>
                        <p className={styles.vocabGridValue}>{unstudiedVocab}</p>
                        <p className={styles.vocabGridLabel}>Chưa học</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Study History Section */}
              <div className={styles.panelContainer}>
                <div className={styles.panelHeader}>
                  <h3 className={styles.panelTitle}>
                    <span className={styles.panelTitleIcon}>
                      <img
                        src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F936a7ff83cbc23e56ec666597825d459466b1dfe.svg?generation=1782490146853459&alt=media"
                        alt="Lịch sử"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </span>
                    Lịch sử học tập
                  </h3>
                  <div className={styles.historyTabs}>
                    <button
                      onClick={() => setHistoryTab("quiz")}
                      className={`${styles.historyTabBtn} ${historyTab === "quiz" ? styles.historyTabBtnActive : ""}`}
                    >
                      <span className={styles.historyTabIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5ada226ec04ce5b8e5f78bc5d4dc032075937bfa.svg?generation=1782490146586580&alt=media"
                          alt="Quiz"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </span>
                      Quiz
                    </button>
                    <button
                      onClick={() => setHistoryTab("flashcard")}
                      className={`${styles.historyTabBtn} ${historyTab === "flashcard" ? styles.historyTabBtnActive : ""}`}
                    >
                      <span className={styles.historyTabIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fe4c04ca899d9a60b190cefa5296a3e60b60c47c8.svg?generation=1782490146599805&alt=media"
                          alt="Flashcard"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </span>
                      Flashcard
                    </button>
                    <button
                      onClick={() => setHistoryTab("test")}
                      className={`${styles.historyTabBtn} ${historyTab === "test" ? styles.historyTabBtnActive : ""}`}
                    >
                      <span className={styles.historyTabIcon}>
                        <img
                          src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff343a758417b2a46afc098b661b6d4eebbebc9d5.svg?generation=1782490146588043&alt=media"
                          alt="Test"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </span>
                      Kiểm tra
                    </button>
                  </div>
                </div>

                {/* History table dynamic */}
                <div style={{ minHeight: 200, padding: 20 }}>
                  {historyTab === "quiz" && (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#a3acc2" }}>
                            <th style={{ padding: "12px 8px" }}>Bài Quiz</th>
                            <th style={{ padding: "12px 8px" }}>Thời gian</th>
                            <th style={{ padding: "12px 8px" }}>Số câu đúng</th>
                            <th style={{ padding: "12px 8px" }}>Tỷ lệ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getQuizHistory().length > 0 ? (
                            getQuizHistory().map((item) => (
                              <tr key={item.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>{item.title}</td>
                                <td style={{ padding: "12px 8px", color: "#6b7280" }}>{formatTimeAgo(item.completedAt)}</td>
                                <td style={{ padding: "12px 8px", color: "#6b7280" }}>{item.correct}/{item.total} câu</td>
                                <td style={{ padding: "12px 8px", fontWeight: "bold", color: "#10b981" }}>{item.score}%</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} style={{ padding: "20px 8px", color: "#a3acc2", textAlign: "center" }}>
                                Chưa có lịch sử làm bài Quiz.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {historyTab === "flashcard" && (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#a3acc2" }}>
                            <th style={{ padding: "12px 8px" }}>Chủ đề từ vựng</th>
                            <th style={{ padding: "12px 8px" }}>Thời gian</th>
                            <th style={{ padding: "12px 8px" }}>Số từ đã học</th>
                            <th style={{ padding: "12px 8px" }}>Đánh giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFlashcardHistory().length > 0 ? (
                            getFlashcardHistory().map((item) => (
                              <tr key={item.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>{item.title}</td>
                                <td style={{ padding: "12px 8px", color: "#6b7280" }}>Đang học</td>
                                <td style={{ padding: "12px 8px", color: "#6b7280" }}>{item.masteredCount}/{item.totalCount} từ</td>
                                <td style={{ padding: "12px 8px", fontWeight: "bold", color: item.isCompleted ? "#10b981" : "#f59e0b" }}>
                                  {item.isCompleted ? "Đạt mục tiêu" : "Đang tiến bộ"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} style={{ padding: "20px 8px", color: "#a3acc2", textAlign: "center" }}>
                                Chưa có lịch sử học Flashcard.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {historyTab === "test" && (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#a3acc2" }}>
                            <th style={{ padding: "12px 8px" }}>Đề kiểm tra</th>
                            <th style={{ padding: "12px 8px" }}>Ngày thi</th>
                            <th style={{ padding: "12px 8px" }}>Kết quả</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getTestHistory().length > 0 ? (
                            getTestHistory().map((item) => (
                              <tr key={item.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "12px 8px", fontWeight: 600, color: "#1c2a4c" }}>{item.title}</td>
                                <td style={{ padding: "12px 8px", color: "#6b7280" }}>{formatDate(item.completedAt)}</td>
                                <td style={{ padding: "12px 8px", fontWeight: "bold", color: "rgb(139, 92, 246)" }}>
                                  {(item.score / 10).toFixed(1)} / 10
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} style={{ padding: "20px 8px", color: "#a3acc2", textAlign: "center" }}>
                                Chưa có lịch sử làm bài kiểm tra.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

            </div>



          </div>
          <Footer />
        </div>
      </Content>

      <Modal
        title={
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1c2a4c" }}>
            Cập nhật thông tin cá nhân
          </div>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleSaveProfile}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên mới" size="large" />
          </Form.Item>

          <Form.Item
            label="Ngày dự thi"
            name="examDate"
          >
            <DatePicker placeholder="Chọn ngày dự thi" format="DD / MM / YYYY" size="large" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới (để trống nếu không đổi)"
            name="password"
            rules={[{ min: 6, message: "Mật khẩu phải chứa ít nhất 6 ký tự!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" size="large" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" size="large" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right", marginTop: 24 }}>
            <Button
              onClick={() => setIsEditModalOpen(false)}
              style={{ marginRight: 8 }}
              size="large"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={updatingProfile}
              size="large"
              style={{ backgroundColor: "#35a873", borderColor: "#35a873" }}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
