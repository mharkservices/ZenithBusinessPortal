"use client"

import * as React from "react"
import PropTypes from 'prop-types'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'

const FeedbackForm = ({ onSubmit }) => {
  const { toast } = useToast()
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({ rating, comment })
      setRating(0)
      setComment("")
      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback! We will get back to you shortly.',
      })
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            <span className={`inline-block h-6 w-6 text-2xl ${value <= rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your feedback..."
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  )
}

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export { FeedbackForm };
export default FeedbackForm;