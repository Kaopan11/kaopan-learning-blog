// AdminContext — จัดการข้อมูล articles/categories ของ Admin Panel (เก็บใน localStorage)
import { createContext, useContext, useState } from 'react'

import { initialAdminArticles } from '@/data/adminArticles'
import { initialAdminCategories } from '@/data/adminCategories'

const ARTICLES_KEY = 'kp_admin_articles'
const CATEGORIES_KEY = 'kp_admin_categories'

const AdminContext = createContext(null)

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function generateId(items) {
  const maxId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
  return String(maxId + 1)
}

export function AdminProvider({ children }) {
  const [articles, setArticles] = useState(() =>
    loadFromStorage(ARTICLES_KEY, initialAdminArticles),
  )
  const [categories, setCategories] = useState(() =>
    loadFromStorage(CATEGORIES_KEY, initialAdminCategories),
  )

  const persistArticles = (next) => {
    setArticles(next)
    saveToStorage(ARTICLES_KEY, next)
  }

  const persistCategories = (next) => {
    setCategories(next)
    saveToStorage(CATEGORIES_KEY, next)
  }

  const getArticle = (id) => articles.find((article) => article.id === id)

  const createArticle = (article, status) => {
    const newArticle = { ...article, id: generateId(articles), status }
    persistArticles([newArticle, ...articles])
    return newArticle
  }

  const updateArticle = (id, updates) => {
    persistArticles(
      articles.map((article) =>
        article.id === id ? { ...article, ...updates } : article,
      ),
    )
  }

  const deleteArticle = (id) => {
    persistArticles(articles.filter((article) => article.id !== id))
  }

  const getCategory = (id) => categories.find((category) => category.id === id)

  const createCategory = (name) => {
    const newCategory = { id: generateId(categories), name }
    persistCategories([...categories, newCategory])
    return newCategory
  }

  const updateCategory = (id, name) => {
    persistCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name } : category,
      ),
    )
  }

  const deleteCategory = (id) => {
    persistCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <AdminContext.Provider
      value={{
        articles,
        categories,
        categoryNames: categories.map((c) => c.name),
        getArticle,
        createArticle,
        updateArticle,
        deleteArticle,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }

  return context
}
