const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async file operations
const path = require('path');
const app = express();

app.use(express.json());

const dataDir = __dirname; // Your data directory

app.post('/blogs', async (req, res) => {
  try {
    const { title, content } = req.body;
    const filePath = path.join(dataDir, `${title}.txt`);
    await fs.writeFile(filePath, content);
    res.send('ok');
  } catch (error) {
    res.status(500).send('Failed to create the post');
  }
});

app.put('/blogs/:title', async (req, res) => {
  const title = req.params.title;
  const filePath = path.join(dataDir, `${title}.txt`);

  try {
    if (await fs.access(filePath).then(() => true).catch(() => false)) {
      const { content } = req.body;
      await fs.writeFile(filePath, content);
      res.send('ok');
    } else {
      res.status(404).send('This post does not exist!');
    }
  } catch (error) {
    res.status(500).send('Error updating the post');
  }
});

app.delete('/blogs/:title', async (req, res) => {
  const title = req.params.title;
  const filePath = path.join(dataDir, `${title}.txt`);

  try {
    if (await fs.access(filePath).then(() => true).catch(() => false)) {
      await fs.unlink(filePath);
      res.send('ok');
    } else {
      res.status(404).send('This post does not exist!');
    }
  } catch (error) {
    res.status(500).send('Error deleting the post');
  }
});

app.get('/blogs/:title', async (req, res) => {
  const title = req.params.title;
  const filePath = path.join(dataDir, `${title}.txt`);

  try {
    const post = await fs.readFile(filePath, 'utf8');
    res.status(200).end(post);
  } catch (error) {
    res.status(404).send('This post does not exist!');
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const files = await fs.readdir(dataDir);
    const txtFiles = files.filter((file) => file.endsWith('.txt'));

    if (txtFiles.length > 0) {
      const postTitles = txtFiles.map((file) => ({
        title: file.replace('.txt', ''),
      }));
      res.status(200).json(postTitles);
    } else {
      res.status(200).json({ message: 'No posts found' });
    }
  } catch (error) {
    res.status(500).send('Error reading posts');
  }
});

app.listen(3090);
