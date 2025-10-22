'use client';

import React, { useState, useMemo } from 'react';

// --- 定数：利用可能なカテゴリー ---
const CATEGORIES = ['すべて', '仕事', 'プライベート', '買い物', 'その他'];

// --- タスク（Todo）の型定義 ---
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}

// カテゴリーごとの色を定義（tailwindのクラス名）
const categoryColors: { [key: string]: string } = {
  '仕事': 'text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-300',
  'プライベート': 'text-green-500 bg-green-100 dark:bg-green-900/50 dark:text-green-300',
  '買い物': 'text-purple-500 bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300',
  'その他': 'text-gray-500 bg-gray-200 dark:bg-gray-600/50 dark:text-gray-400',
};

// カテゴリーの色を取得するヘルパー関数
const getCategoryColor = (category: string) => categoryColors[category] || 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300';


export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState(CATEGORIES[1]);
  const [filterCategory, setFilterCategory] = useState(CATEGORIES[0]);

  // 1. タスクの追加処理
  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      category: newTodoCategory,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  // 2. タスクの完了状態を切り替える（トグル）
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 3. タスクの削除処理
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
    
  // 4. 表示するTodoリストをフィルターする処理
  const filteredTodos = useMemo(() => {
    if (filterCategory === CATEGORIES[0]) {
      return todos;
    }
    return todos.filter(todo => todo.category === filterCategory);
  }, [todos, filterCategory]);

  return (
    // 全体の背景とテキストカラーを落ち着いたトーンに変更
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      
      {/* メインのコンテナをよりソフトでモダンなデザインに */}
      <div className="w-full max-w-lg rounded-3xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm dark:bg-zinc-800/90 md:p-10">
        
        {/* タイトルデザインの変更 */}
        <h1 className="mb-10 text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
          Modern Todo List 📝
        </h1>

        {/* --- タスク追加フォーム --- */}
        <div className="mb-8 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          {/* カテゴリー選択ドロップダウン（新規タスク用） - 角丸とフォーカス色を変更 */}
          <select
            value={newTodoCategory}
            onChange={(e) => setNewTodoCategory(e.target.value)}
            className="rounded-xl border border-zinc-300 p-3 text-base dark:border-zinc-600 dark:bg-zinc-700 dark:text-white appearance-none pr-8"
          >
            {CATEGORIES.slice(1).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* 入力フィールド - 角丸とフォーカス色を変更 */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="タスクを入力..."
            className="flex-grow rounded-xl border border-zinc-300 p-3 text-base focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white shadow-inner"
          />
          
          {/* 追加ボタン - インディゴカラーに変更し、シャドウを追加 */}
          <button
            onClick={addTodo}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700 shadow-md"
          >
            追加
          </button>
        </div>

        {/* --- フィルター選択ドロップダウン --- */}
        <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-700">
          <label className="font-semibold text-zinc-600 dark:text-zinc-400">
            グループで絞り込み:
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-xl border border-zinc-300 p-2 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white text-base appearance-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* --- Todoリスト本体 --- */}
        <ul className="space-y-4">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-4">
              {filterCategory === CATEGORIES[0] 
                ? 'タスクはありません。'
                : `「${filterCategory}」のタスクはありません。`}
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                  todo.completed
                    ? 'bg-green-50/70 dark:bg-green-900/30' // 完了時: 薄いグリーン
                    : 'bg-white hover:bg-zinc-50 dark:bg-zinc-700/80 dark:hover:bg-zinc-700 shadow-sm' // 未完了時: ソフトなシャドウ
                }`}
              >
                
                {/* タスクのテキストとカテゴリーラベル */}
                <div 
                    className="flex flex-col items-start flex-grow pr-4" 
                    onClick={() => toggleTodo(todo.id)}
                >
                    {/* カテゴリーラベル - 色分けを強化 */}
                    <span 
                        className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${getCategoryColor(todo.category)}`}
                    >
                        {todo.category}
                    </span>
                    
                    {/* タスクテキスト - 完了時のスタイルを強調 */}
                    <span
                      className={`text-base ${
                        todo.completed
                          ? 'text-zinc-500 line-through dark:text-zinc-400 italic'
                          : 'text-zinc-800 dark:text-zinc-100'
                      }`}
                    >
                      {todo.text}
                    </span>
                </div>

                {/* 削除ボタン - 洗練されたホバーエフェクト */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/50"
                  aria-label="タスクを削除"
                >
                  {/* Xアイコン (SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}