import { supabase } from "@/app/api/utils/supabase";

// GET - Get single contact by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const contact = await supabase.getContact(id);

    if (!contact) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    return Response.json({ contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return Response.json({ error: "Failed to fetch contact" }, { status: 500 });
  }
}

// PUT - Update contact
export async function PUT(request, { params }) {
  try {
    const { id } = params;
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

    const updateData = {
      name,
      portfolio: portfolio || "",
      contact,
      services,
      updated_at: new Date().toISOString(),
    };

    const updatedContact = await supabase.updateContact(id, updateData);

    if (!updatedContact) {
      return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    return Response.json({ contact: updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return Response.json(
      { error: "Failed to update contact" },
      { status: 500 },
    );
  }
}

// DELETE - Delete contact
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await supabase.deleteContact(id);

    return Response.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return Response.json(
      { error: "Failed to delete contact" },
      { status: 500 },
    );
  }
}
