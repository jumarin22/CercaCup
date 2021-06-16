import { Form } from './Form'
import { useState, useEffect } from 'react'
import articles from '../articles'

export function Results() {
  function setEmoji(type) {
    switch (type) {
      case 'Cafe':
        return '☕'

      case 'Gas':
        return '⛽'

      case 'Fast':
        return '🍔'

      default:
        return '❓'
    }
  }

  return (
    <>
      <div className="top">
        ☕<Form />
      </div>
      {articles.map((article) => (
        <article key={article.id}>
          <p>{setEmoji(article.type)}</p>
          <p>{article.name}</p>
          <p>{article.address}</p>
          <button>Delete</button>
        </article>
      ))}
    </>
  )
}
