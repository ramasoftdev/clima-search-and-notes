class Api::NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    notes = renderize_json({ page: params[:page], per_page: params[:per_page] })
    render json: {notes: notes, page: notes.current_page, pages: notes.total_pages}
  end

  def create
    @note = current_user.notes.build(notes_params)
    if !@note.title.blank? && !@note.note_description.blank?
      if @note.save
        notes = renderize_json({ page: params[:page], per_page: params[:per_page] })
        render json: {notes: notes, page: notes.current_page, pages: notes.total_pages, message: "Note added succefully!"}, status: 201
      else
        render json: { errors: [ { status: :bad_request, title: "Bad Request", message: @note.errors, code: "100" } ] }, status: :bad_request
      end
    else
      render json: { errors: [ { status: :bad_request, title: "Bad Request", message: "Title or Content is empty", code: "100" } ] }, status: :bad_request
    end
  end

  def show
    if !@note.nil? && @note.user_id === current_user.id
      render json: { note: { title: @note.title, note_description: @note.note_description } }, status: 201
    else
      render json: { errors: [ { status: :bad_request, title: "Bad Request", message: "Note doesn't exist", code: "100" } ] }, status: :bad_request
    end
  end

  def update
    if @note.user_id === current_user.id && @note.update(notes_params)
      notes = renderize_json({ page: params[:page], per_page: params[:per_page] })
      render json: {notes: notes, page: notes.current_page, pages: notes.total_pages, message: "Note updated succefully!"}, status: 201
    else
      render json: { errors: [ { status: :bad_request, title: "Bad Request", message: @note.errors, code: "100" } ] }, status: :bad_request
    end
  end

  def destroy
    @note.status = 'Deactive'
    if @note.user_id === current_user.id && @note.save
      notes = renderize_json({ page: params[:page], per_page: params[:per_page] })
      render json: { notes: notes, page: notes.current_page, pages: notes.total_pages, message: "Note deleted succefully!"}, status: 201
    else
      render json: { errors: [ { status: :bad_request, title: "Bad Request", message: @note.errors, code: "100" } ] }, status: :bad_request
    end
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def notes_params
    params.require(:note).permit(:title, :note_description, :page, :per_page)
  end

  def renderize_json(myparams)
    notes = set_note_with_pagination(myparams)
    while notes.length < 1 && current_user.notes.where(status: "active").count > 1
      myparams[:page] = (myparams[:page].to_i - 1).to_s
      notes = set_note_with_pagination(myparams)
    end
    return notes
  end

  def set_note_with_pagination(myparams)
    return current_user.notes.where(status: "Active").order(updated_at: :DESC).paginate(myparams)
  end
end