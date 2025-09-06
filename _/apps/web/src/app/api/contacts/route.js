import { supabase } from "@/app/api/utils/supabase";

// GET - List all contacts with optional search
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";

    const contacts = await supabase.getContacts(search);

    return Response.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return Response.json(
      { error: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}

// POST - Create new contact
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, portfolio, contact, services } = body;

    // Validate required fields
    if (!name || !contact || !services) {
      return Response.json(
        {
          error: "Nome, contato e serviços são obrigatórios",
        },
        { status: 400 },
      );
    }

    const contactData = {
      name,
      portfolio: portfolio || "",
      contact,
      services,
    };

    const newContact = await supabase.createContact(contactData);

    return Response.json({ contact: newContact }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return Response.json(
      { error: "Failed to create contact" },
      { status: 500 },
    );
  }
}
