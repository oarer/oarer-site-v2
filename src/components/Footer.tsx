import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="flex justify-center py-4">
      <p className="text-center text-sm font-semibold text-neutral-300 dark:text-neutral-800">
        © 2024–{year} oarer. Проект с открытым исходным кодом. Лицензия{' '}
        <Link
          className="underline hover:opacity-80"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </Link>
        .
      </p>
    </footer>
  )
}
