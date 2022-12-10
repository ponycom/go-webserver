package config

import "go-server/helper"

type Message struct {
	ID     int64  `json:"id"`
	Body   string `json:"body"`
	Sender string `json:"sender"`
}

func NewMessage(body string, sender string) *Message {
	return &Message{
		ID:     helper.GetRandomI64(),
		Body:   body,
		Sender: sender,
	}
}
