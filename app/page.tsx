"use client";

import { useState } from "react";
import AdSenseAd from "./components/AdSenseAd";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Google AdSense integration", done: false, createdAt: new Date().toLocaleDateString() },
    { id: 2, text: "Build Next.js project", done: true, createdAt: new Date().toLocaleDateString() },
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [addCount, setAddCount] = useState(0);

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const addTodo = async () => {
    if (!input.trim()) return;
  
    // Trigger ad first
    try {
      if (typeof window !== "undefined") {
        document.dispatchEvent(new Event("click"));
      }
    } catch (e) {
      console.log("Ad trigger failed", e);
    }
  
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      done: false,
      createdAt: new Date().toLocaleDateString(),
    };
  
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    setAddCount((c) => c + 1);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const pending = todos.filter((t) => !t.done).length;
  const done = todos.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">

      {/* Header banner — replace adSlot with your AdSense unit ID */}
      <div className="w-full flex justify-center py-3 bg-white border-b border-amber-200 shadow-sm">
        <AdSenseAd adSlot="5526326864" label="Header Banner" adFormat="auto" className="min-h-[90px] flex items-center justify-center w-full max-w-[728px]" />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050823753585928"
     crossOrigin="anonymous"></script>
<ins className="adsbygoogle"
     style={{display:"block"}}
     data-ad-client="ca-pub-3050823753585928"
     data-ad-slot="5526326864"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-6">

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <h1 className="text-4xl font-black text-amber-900 tracking-tight">My Tasks</h1>
              <p className="text-amber-600 mt-1">{pending} pending · {done} completed</p>
            </div>

            {/* Add Todo */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-300 bg-white focus:outline-none focus:border-amber-500 text-amber-900 placeholder-amber-300 font-medium shadow-sm"
              />
              <button onClick={addTodo} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-sm transition-colors">
                + Add
              </button>
            </div>

            {/* In-feed rectangle */}
            <div className="mb-5 flex justify-center">
            <AdSenseAd
  adSlot="2170525467"
  adFormat="auto"
/>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4">
              {(["all", "active", "done"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${filter === f ? "bg-amber-500 text-white shadow" : "bg-white text-amber-700 border border-amber-200 hover:border-amber-400"}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Todo List */}
            <div className="space-y-2">
              {filteredTodos.length === 0 && (
                <div className="text-center py-12 text-amber-400 font-medium">No tasks here! Add one above</div>
              )}
              {filteredTodos.map((todo) => (
                <div key={todo.id} className={`flex items-center gap-3 p-4 bg-white rounded-xl border-2 shadow-sm transition-all group ${todo.done ? "border-green-200 opacity-70" : "border-amber-200 hover:border-amber-400"}`}>
                  <button onClick={() => toggleTodo(todo.id)} className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${todo.done ? "bg-green-500 border-green-500 text-white" : "border-amber-400 hover:border-amber-600"}`}>
                    {todo.done && <span className="text-xs">✓</span>}
                  </button>
                  <span className={`flex-1 font-medium text-amber-900 ${todo.done ? "line-through text-amber-400" : ""}`}>{todo.text}</span>
                  <span className="text-xs text-amber-300 hidden group-hover:block">{todo.createdAt}</span>
                  <button onClick={() => deleteTodo(todo.id)} className="text-amber-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 font-bold text-lg leading-none">×</button>
                </div>
              ))}
            </div>

            {/* Bottom content (shows when list has items) */}
            {todos.length > 3 && (
              <div className="mt-8 flex justify-center">
                <AdSenseAd adSlot="0000000003" label="Bottom Content 300x250" adFormat="rectangle" className="min-h-[250px] w-full max-w-[336px]" />
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="w-72 flex-shrink-0 hidden lg:block">
            <div className="sticky top-4">
              <AdSenseAd adSlot="0000000004" label="Sidebar 300x600" adFormat="vertical" fullWidthResponsive={false} className="min-h-[250px] flex items-start justify-center w-[300px]" style={{ minHeight: 600 }} />

              <div className="mt-4 bg-white rounded-xl border-2 border-amber-200 p-4">
                <h3 className="font-bold text-amber-900 mb-3">Stats</h3>
                <div className="space-y-2 text-sm">
                  {[["Total tasks", todos.length, "text-amber-900"],["Completed", done, "text-green-600"],["Pending", pending, "text-orange-500"],["Tasks added", addCount, "text-blue-500"]].map(([label, val, cls]) => (
                    <div key={label as string} className="flex justify-between">
                      <span className="text-amber-600">{label}</span>
                      <span className={`font-bold ${cls}`}>{val as number}</span>
                    </div>
                  ))}
                </div>
                {todos.length > 0 && (
                  <div className="mt-3">
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 transition-all" style={{ width: `${(done / todos.length) * 100}%` }} />
                    </div>
                    <p className="text-xs text-amber-400 mt-1 text-right">{Math.round((done / todos.length) * 100)}% done</p>
                  </div>
                )}
              </div>

              <div className="mt-4 bg-amber-900 text-amber-100 rounded-xl p-4 text-xs leading-relaxed">
                <p className="font-bold text-amber-300 mb-2">AdSense Setup Tips</p>
                <p className="mb-2">Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to your ca-pub-… publisher ID.</p>
                <p className="mb-2">Create display ad units in AdSense and replace each adSlot value in page.tsx.</p>
                <p>Ads only show on approved domains; use dev labels locally to see slot placement.</p>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white border-t border-amber-200 py-2 shadow-lg z-50">
        <AdSenseAd adSlot="0000000005" label="Sticky Footer" adFormat="horizontal" className="min-h-[50px] flex items-center w-full max-w-[320px]" />
      </div>

      <div className="h-16" />
    </div>
  );
}
