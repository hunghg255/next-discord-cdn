'use client';

import { useState } from 'react';

import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(false);

  const uplaod = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append('file', file as any);

    const r = await axios({
      method: 'post',
      url: '/api/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: form,
    });
    setFile(undefined);

    setResult(r.data);
    setLoading(false);
  };

  return (
    <main>
      <input
        type='file'
        accept='image/*'
        onChange={(e: any) => {
          setFile(e.target.files[0]);
        }}
      />

      <button onClick={uplaod}>Upload</button>
      <br />
      <br />

      {result?.url && (
        <div>
          <textarea
            value={result.url}
            readOnly
            style={{
              width: '500px',
              height: '150px',
              display: 'block',
            }}
          ></textarea>
          <br />
          <br />
          <img
            src={result.url}
            alt=''
            style={{
              maxWidth: '300px',
            }}
          />
        </div>
      )}
    </main>
  );
}
