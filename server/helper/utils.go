package helper

import (
	"math/rand"
	"time"
)

func GetRandom() *rand.Rand {
	return rand.New(rand.NewSource(time.Now().UnixNano()))
}

func GetRandomI64() int64 {
	return GetRandom().Int63()
}
func GetRandomInt() int {
	return GetRandom().Int()
}
