import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    try {
      const {
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      } = await Recipient.create(req.body);

      return res.status(201).json({
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      });
    } catch (e) {
      return res.status(400).json({ error: `Error: ${e}` });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      zip_code: Yup.number(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not Exist' });
    }

    const { name, zip_code } = await recipient.update(req.body);

    return res.status(200).json({ name, zip_code });
  }
}

export default new RecipientController();
