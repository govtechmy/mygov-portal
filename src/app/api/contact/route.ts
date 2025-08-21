import { NextRequest, NextResponse } from 'next/server';

// --- Turnstile verification helper ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';

  if (isDevelopment) {
    console.log('Turnstile verification skipped in development mode');
    return true;
  }

  if (!process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
    console.warn('Cloudflare Turnstile secret key not configured');
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    if (ip && ip !== 'unknown') {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const result = await response.json();
    console.log('Turnstile verification result:', result);

    return result.success === true;
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return false;
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     // 🔹 Extract Turnstile token from the form submission
//     const formData = await req.formData();

//     // const turnstileToken = formData.get('cf-turnstile-response')?.toString();
//     // const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

//     // // 🔹 Check if Turnstile is enabled before requiring verification
//     // const isTurnstileEnabled = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_ENABLED === 'true';

//     // // 🔹 Verify Turnstile before hitting Freshdesk
//     // if (isTurnstileEnabled) {
//     //   if (!turnstileToken) {
//     //     return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
//     //   }

//     //   const isValidTurnstile = await verifyTurnstile(turnstileToken, ip);
//     //   if (!isValidTurnstile) {
//     //     return NextResponse.json({ error: 'Invalid verification token' }, { status: 400 });
//     //   }
//     // }

//     formData.delete('cf-turnstile-response'); // Remove Turnstile token from form data

//     // 🔹 Proceed with Freshdesk request if verified
//     const apiKey = process.env.FRESHDESK_API_KEY;
//     const url = process.env.FRESHDESK_API_URL;

//     const subject = formData.get('subject')?.toString();
//     let freshSubjectCategories = '';
//     let freshSubjectSubCategories = '';

//     if (subject?.includes('Pertanyaan')) {
//       //Pertanyaan)
//       freshSubjectCategories = 'Pertanyaan';
//       freshSubjectSubCategories = 'Others';
//     }

//     if (subject?.includes('Aduan')) {
//       //Aduan)
//       freshSubjectCategories = 'Aduan';
//       freshSubjectSubCategories = 'Others';
//     }

//     if (subject?.includes('Cadangan')) {
//       //Cadangan)
//       freshSubjectCategories = 'Cadangan/Maklum Balas';
//       freshSubjectSubCategories = 'Feedback';
//     }

//     if (subject?.includes('Maklum Balas')) {
//       //Maklum Balas)
//       freshSubjectCategories = 'Maklum Balas';
//       freshSubjectSubCategories = 'Feedback';
//     }

//     if (subject?.includes('AduanMyGOV')) {
//       //Maklum Balas)
//       freshSubjectCategories = 'MyGOV';
//       freshSubjectSubCategories = 'MyGOV - General';
//     }

//     if (subject?.includes('Aduan-MyDigital ID')) {
//       freshSubjectCategories = 'MyDigital ID';
//       freshSubjectSubCategories = 'Technical issue';
//     }

//     formData.append('custom_fields[cf_categories]', freshSubjectCategories);
//     formData.append('custom_fields[cf_sub_categories]', freshSubjectSubCategories);

//     // const payload = {
//     //   name,
//     //   email,
//     //   phone,
//     //   subject,
//     //   source: 2,
//     //   priority: 1,
//     //   status: 2,
//     //   description: descriptionHtml,
//     //   custom_fields: {
//     //     cf_categories: freshSubjectCategories,
//     //     cf_sub_categories: freshSubjectSubCategories,
//     //   },
//     // };

//     // console.log(formData);

//     if (!apiKey || !url) {
//       return NextResponse.json({ error: 'Freshdesk API credentials not configured' }, { status: 500 });
//     }

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64'),
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     // const response = await fetch(url, {
//     //   method: 'POST',
//     //   headers: { Authorization: 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64') },
//     //   body: formData,
//     // });

//     const responseClone = response.clone();
//     let data: Record<string, unknown>;
//     try {
//       data = await response.json();
//     } catch {
//       const text = await responseClone.text();
//       data = { response: text };
//     }

//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     const err = error as Error;
//     console.error('Freshdesk proxy error:', error);
//     return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, subject, description, attachment } = body;

    let freshSubjectCategories = '';
    let freshSubjectSubCategories = '';

    if (subject?.includes('Pertanyaan')) {
      freshSubjectCategories = 'Pertanyaan';
      freshSubjectSubCategories = 'Others';
    } else if (subject?.includes('Aduan-MyDigital ID')) {
      freshSubjectCategories = 'MyDigital ID';
      freshSubjectSubCategories = 'Technical issue';
    } else if (subject?.includes('AduanMyGOV')) {
      freshSubjectCategories = 'MyGOV';
      freshSubjectSubCategories = 'MyGOV - General';
    } else if (subject?.includes('Aduan')) {
      freshSubjectCategories = 'Aduan';
      freshSubjectSubCategories = 'Others';
    } else if (subject?.includes('Cadangan')) {
      freshSubjectCategories = 'Cadangan/Maklum Balas';
      freshSubjectSubCategories = 'Feedback';
    } else if (subject?.includes('Maklum Balas')) {
      freshSubjectCategories = 'Maklum Balas';
      freshSubjectSubCategories = 'Feedback';
    }

    const payload: any = {
      name,
      email,
      phone,
      subject,
      source: 2,
      priority: 1,
      status: 2,
      description,
      custom_fields: {
        cf_categories: freshSubjectCategories,
        cf_sub_categories: freshSubjectSubCategories,
      },
    };

    if (attachment) {
      payload.attachment = attachment;
    }

    const apiKey = process.env.FRESHDESK_API_KEY;
    const url = process.env.FRESHDESK_API_URL;

    if (!apiKey || !url) {
      return NextResponse.json({ error: 'Freshdesk API credentials not configured' }, { status: 500 });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseClone = response.clone();
    let data: Record<string, unknown>;
    try {
      data = await response.json();
    } catch {
      const text = await responseClone.text();
      data = { response: text };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    const err = error as Error;
    console.error('Freshdesk proxy error:', error);
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 });
  }
}
