import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, cvData, jobDescription, targetLanguage, roleTitle, companyName } = body;

    let prompt = '';

    switch (action) {
      case 'tailor':
        prompt = `You are an expert ATS resume optimizer. Tailor the following CV strictly for the target job description. Enhance bullet points with action verbs and quantifiable results while keeping candidate facts accurate.
        
JOB DESCRIPTION:
${jobDescription}

CURRENT CV JSON:
${JSON.stringify(cvData)}

Return ONLY a valid JSON object matching the CV structure.`;
        break;

      case 'cover-letter':
        prompt = `Write a compelling, professional cover letter for candidate ${cvData?.basics?.fullName || 'Candidate'} applying for the position of "${roleTitle || cvData?.basics?.role || 'Professional'}" at "${companyName || 'Target Company'}".
        
Candidate Background:
- Summary: ${cvData?.basics?.summary || ''}
- Key Experiences: ${JSON.stringify(cvData?.experience?.slice(0, 2) || [])}
- Top Skills: ${JSON.stringify(cvData?.skills?.slice(0, 8) || [])}

Ensure the letter has a confident, ATS-friendly tone with clear paragraphs.`;
        break;

      case 'translate':
        prompt = `Translate all text and descriptive fields in this CV JSON accurately to ${targetLanguage}. Maintain standard professional and ATS terminology in the target language.
        
CURRENT CV JSON:
${JSON.stringify(cvData)}

Return ONLY the updated valid JSON object.`;
        break;

      case 'interview-prep':
        prompt = `Based on the following candidate profile, generate a comprehensive interview preparation guide:
1. 5 tough behavioral and technical interview questions tailored to their background.
2. STAR-method answer outlines highlighting their specific experience.
3. 3 intelligent, high-impact questions the candidate should ask the hiring team.

CANDIDATE CV:
${JSON.stringify(cvData)}`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid or missing action parameter' }, { status: 400 });
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ result: responseText });
  } catch (error: any) {
    console.error('AlmiCV AI Route Error:', error);
    return NextResponse.json({ error: error.message || 'AI processing encountered an error' }, { status: 500 });
  }
}
