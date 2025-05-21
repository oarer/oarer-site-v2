export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="flex justify-center py-6">
      <p className="text-center text-sm font-semibold text-neutral-300 dark:text-neutral-800">
        Copyright © 2024-{year} oarer. Все права защищены. Скачивание,
        копирование и редактирование запрещено!
      </p>
    </footer>
  )
}
