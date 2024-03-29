const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class NotesController {
    async create(request, response) {
        const { title, description, rating, movie_tags } = request.body
        const  user_id  = request.user.id;

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsInsert = movie_tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        })
        await knex("movie_tags").insert(tagsInsert)

       return response.json()

    }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex("movie_notes").where({ id }).first();

        const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name")

        return response.json({
            ...note, tags
        });

    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title, movie_tags } = request.query;

        const user_id = request.user.id

        let notes;

        if (movie_tags) {
            const filterTags = movie_tags.split(',').map(tag => tag.trim());

            notes = await knex("movie_tags")
                .select([
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.user_id"
                ])
                .where("movie_notes.user_id", user_id)
                .whereLike("movie_notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
                .groupBy("notes.id")
                .orderBy("notes.title")
        } else {
            notes = await knex("movie_notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }

        const viewTags = await knex("movie_tags").where({ user_id })
        const notesTags = notes.map(note => {
            const filterNotesTags = viewTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: filterNotesTags
            }
        })


        return response.json(notesTags)
    }
}

module.exports = NotesController