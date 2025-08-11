insert into public.achievements (id, label, description, emoji, color)
values ('first_trip', 'First steps', 'Added your first trip', '🧭', '#0ea5e9')
on conflict (id) do nothing;
