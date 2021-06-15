import { Form } from './Form'
import { useState, useEffect } from 'react'
import articles from '../articles'

export function Results() {
  return (
    <>
      <div className="top">
        ☕<Form />
      </div>
      {articles.map((article) => (
        <article key={article.id}>
          <p>{article.name}</p>
          <p>{article.address}</p>
        </article>
      ))}
    </>
  )
}
