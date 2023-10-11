import React from "react";
import { format } from 'date-fns'
import { stripHtml } from "string-strip-html";

const Note = (note) => {
  return (
    <a href={`/note/${note.note.id}`}>
    <div className="bg-green-100 dark:bg-green-50 p-4 rounded-md space-y-2">
      <h3 className="font-bold text-lg leading-6 text-gray-900">{note.note.title}</h3>
      <p className="font-medium text-sm text-gray-800">{stripHtml(note.note.body).result.slice(0,400)}</p>
      <span className="font-normal text-xs text-gray-700">{format(new Date(note.note.created_at) , 'PPP')}</span>
    </div>
    </a>
  );
};

export default Note;
