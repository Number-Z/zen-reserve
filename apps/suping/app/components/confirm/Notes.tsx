export default function Notes() {
  return (
    <section className="mx-auto flex w-80 flex-col gap-2 rounded-lg border p-4">
      <div>
        <h3 className="font-bold">日程・人数変更</h3>
        <p className="text-sm">1日前の18時まで</p>
      </div>
      <div>
        <h3 className="font-bold">キャンセル</h3>
        <p className="text-sm">2日前まで無償、以降100%</p>
      </div>
    </section>
  );
}
